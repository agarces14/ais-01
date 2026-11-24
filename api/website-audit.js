import OpenAI from "openai";
import { lookup } from "node:dns/promises";
import net from "node:net";
import { requireUser, text, onlyPost, MODEL, MAX_OUTPUT_TOKENS, HONESTY_RULES } from "./_lib.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const FETCH_TIMEOUT_MS = 10000;
const MAX_HTML_BYTES = 1_500_000;

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 10 || a === 127 || a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    );
  }
  const v = ip.toLowerCase();
  return v === "::1" || v === "::" || v.startsWith("fc") || v.startsWith("fd") ||
    v.startsWith("fe80") || v.startsWith("::ffff:");
}

/** Valida la URL y evita que se usen direcciones internas (SSRF). */
async function safeUrl(raw) {
  let url;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (!["http:", "https:"].includes(url.protocol)) return null;
  if (url.port && !["80", "443"].includes(url.port)) return null;
  const addrs = await lookup(url.hostname, { all: true }).catch(() => []);
  if (!addrs.length || addrs.some((a) => isPrivateIp(a.address))) return null;
  return url;
}

async function fetchPage(url, redirectsLeft = 3) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const resp = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "AIS-01-WebsiteAudit/1.0", Accept: "text/html" },
    });
    if (resp.status >= 300 && resp.status < 400 && resp.headers.get("location")) {
      if (!redirectsLeft) throw new Error("Demasiadas redirecciones");
      const next = await safeUrl(new URL(resp.headers.get("location"), url).href);
      if (!next) throw new Error("Redirección a una dirección no permitida");
      return fetchPage(next, redirectsLeft - 1);
    }
    const reader = resp.body?.getReader();
    let received = 0;
    const chunks = [];
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.length;
      if (received > MAX_HTML_BYTES) { controller.abort(); break; }
      chunks.push(value);
    }
    const html = Buffer.concat(chunks.map((c) => Buffer.from(c))).toString("utf8");
    return { finalUrl: url.href, status: resp.status, html };
  } finally {
    clearTimeout(timer);
  }
}

function strip(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/** Extrae hechos observables del HTML; nada de esto lo inventa el modelo. */
function extractFacts({ finalUrl, status, html }) {
  const body = html.replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const pick = (re) => (html.match(re)?.[1] || "").trim();
  const all = (re) => [...body.matchAll(re)].map((m) => strip(m[1])).filter(Boolean);
  const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const visibleText = strip(body);

  return {
    url: finalUrl,
    httpStatus: status,
    https: finalUrl.startsWith("https://"),
    title: strip(pick(/<title[^>]*>([\s\S]*?)<\/title>/i)).slice(0, 200),
    metaDescription: pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i).slice(0, 300),
    hasViewportMeta: /<meta[^>]+name=["']viewport["']/i.test(html),
    lang: pick(/<html[^>]+lang=["']([^"']+)/i),
    h1: all(/<h1[^>]*>([\s\S]*?)<\/h1>/gi).slice(0, 5),
    h2: all(/<h2[^>]*>([\s\S]*?)<\/h2>/gi).slice(0, 12),
    forms: (html.match(/<form\b/gi) || []).length,
    phoneLinks: links.filter((l) => l.startsWith("tel:")).length,
    emailLinks: links.filter((l) => l.startsWith("mailto:")).length,
    whatsappLinks: links.filter((l) => /wa\.me|whatsapp/i.test(l)).length,
    images: (html.match(/<img\b/gi) || []).length,
    imagesWithoutAlt: (html.match(/<img\b(?![^>]*\balt=)[^>]*>/gi) || []).length,
    htmlBytes: html.length,
    textLength: visibleText.length,
    likelyJsOnly: visibleText.length < 200,
    textSample: visibleText.slice(0, 5000),
  };
}

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return;
  if (!(await requireUser(req, res))) return;

  const website = text(req.body?.website, 300);
  if (!website) return res.status(400).json({ error: "website is required" });

  const url = await safeUrl(website);
  if (!url) return res.status(400).json({ error: "URL no válida o no permitida." });

  let facts;
  try {
    facts = extractFacts(await fetchPage(url));
  } catch (error) {
    console.error("website-audit fetch", error?.message);
    return res.status(422).json({
      error: "No se ha podido abrir la web (bloqueo, tiempo de espera o error). No se genera auditoría sin datos reales.",
    });
  }

  try {
    const prompt = `
Eres el agente de auditoría web de AIS-01.

Has recibido datos REALES extraídos del HTML de la web. Basa la auditoría solo en ellos.
No has visto el diseño visual, ni la velocidad, ni el comportamiento en móvil: si algo
depende de eso, indica "no observable con estos datos".
Si "likelyJsOnly" es true, avisa de que la web carga su contenido con JavaScript y el
análisis es limitado.

DATOS OBSERVADOS (JSON):
${JSON.stringify(facts)}

Devuelve en español:
1. Resumen de lo observado (citando datos concretos)
2. Problemas detectados, ordenados por impacto, cada uno con su evidencia
3. Lo que no se ha podido comprobar
4. Recomendaciones concretas
5. Mensaje breve y honesto para presentar la auditoría al negocio
${HONESTY_RULES}`;

    const response = await client.responses.create({
      model: MODEL,
      input: prompt,
      max_output_tokens: MAX_OUTPUT_TOKENS,
    });

    return res.status(200).json({ result: response.output_text, facts });
  } catch (error) {
    console.error("website-audit model", error?.message);
    return res.status(500).json({ error: "Website Audit Agent failed" });
  }
}
