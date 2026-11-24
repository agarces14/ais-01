import OpenAI from "openai";
import { requireUser, text, onlyPost, MODEL, MAX_OUTPUT_TOKENS, HONESTY_RULES } from "./_lib.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return;
  if (!(await requireUser(req, res))) return;

  try {
    const businessName = text(req.body?.businessName, 120);
    const industry = text(req.body?.industry, 120);
    const problem =
      text(req.body?.problem, 1000) ||
      "Necesita mejor presencia digital, automatización y conversión de contactos.";
    const budgetLevel = text(req.body?.budgetLevel, 40) || "medium";

    if (!businessName || !industry) {
      return res.status(400).json({ error: "businessName and industry are required" });
    }

    const prompt = `
Eres el agente de propuestas de AIS-01.

Crea una propuesta comercial en español para este negocio.

Negocio: ${businessName}
Sector: ${industry}
Problema u oportunidad: ${problem}
Nivel de presupuesto: ${budgetLevel}

Devuelve:
1. Resumen
2. Problema principal (según lo indicado, sin inventar datos)
3. Solución propuesta
4. Qué incluye y qué no incluye
5. Rango de precio orientativo (indica que es orientativo y debe confirmarse)
6. Beneficios esperables, sin cifras inventadas ni garantías
7. Mensaje para enviar al cliente
8. Próximo paso
${HONESTY_RULES}`;

    const response = await client.responses.create({
      model: MODEL,
      input: prompt,
      max_output_tokens: MAX_OUTPUT_TOKENS,
    });

    return res.status(200).json({ result: response.output_text });
  } catch (error) {
    console.error("generate-proposal", error?.message);
    return res.status(500).json({ error: "Proposal Agent failed" });
  }
}
