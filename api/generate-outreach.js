import OpenAI from "openai";
import { requireUser, text, onlyPost, MODEL, MAX_OUTPUT_TOKENS, HONESTY_RULES } from "./_lib.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return;
  if (!(await requireUser(req, res))) return;

  try {
    const businessName = text(req.body?.businessName, 120);
    const industry = text(req.body?.industry, 120);
    const platform = text(req.body?.platform, 40) || "email";
    const goal = text(req.body?.goal, 400) || "Responder a su interés por una web o automatización";

    if (!businessName || !industry) {
      return res.status(400).json({ error: "businessName and industry are required" });
    }

    const prompt = `
Eres el agente de mensajes de AIS-01.

Redacta en español una respuesta personalizada para un negocio que YA ha contactado
o ha pedido información (no es un mensaje en frío).

Negocio: ${businessName}
Sector: ${industry}
Canal: ${platform}
Objetivo: ${goal}

Devuelve:
1. Mensaje principal para ${platform}
2. Versión más corta
3. Un seguimiento educado (solo si no responde en unos días)
4. Asunto, si es email
5. Llamada a la acción final

Estilo: natural, humano, directo, sin exageraciones. Incluye siempre una forma sencilla
de decir "no me interesa" y no volver a recibir mensajes.
${HONESTY_RULES}`;

    const response = await client.responses.create({
      model: MODEL,
      input: prompt,
      max_output_tokens: MAX_OUTPUT_TOKENS,
    });

    return res.status(200).json({ result: response.output_text });
  } catch (error) {
    console.error("generate-outreach", error?.message);
    return res.status(500).json({ error: "Outreach Agent failed" });
  }
}
