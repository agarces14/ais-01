import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const allowedEmails = (process.env.ALLOWED_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Exige una sesión válida de Supabase Auth (cabecera Authorization: Bearer <token>).
 * Si ALLOWED_EMAILS está definido, además exige que el email esté en la lista.
 * Devuelve el usuario o null (y en ese caso ya ha respondido 401/403/500).
 */
export async function requireUser(req, res) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    res.status(500).json({ error: "Servidor sin configurar (Supabase)." });
    return null;
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    res.status(401).json({ error: "Inicia sesión para usar el agente." });
    return null;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    res.status(401).json({ error: "Sesión no válida o caducada." });
    return null;
  }

  const email = (data.user.email || "").toLowerCase();
  if (allowedEmails.length && !allowedEmails.includes(email)) {
    res.status(403).json({ error: "Usuario sin permiso." });
    return null;
  }

  return data.user;
}

/** Recorta y valida un campo de texto de la petición. */
export function text(value, max = 300) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function onlyPost(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST requests allowed" });
    return false;
  }
  return true;
}

export const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
export const MAX_OUTPUT_TOKENS = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 1500);

export const HONESTY_RULES = `
Reglas obligatorias:
- No inventes datos, cifras, clientes, testimonios ni resultados.
- No prometas ventas, posicionamiento ni plazos.
- Si algo no se puede saber con la información dada, dilo explícitamente.
- Cualquier mensaje de contacto es para alguien que ya ha mostrado interés o lo ha solicitado; no redactes campañas de envío masivo no solicitado.
`;
