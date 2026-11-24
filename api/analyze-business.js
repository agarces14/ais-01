import OpenAI from "openai";
import { requireUser, text, onlyPost, MODEL, MAX_OUTPUT_TOKENS, HONESTY_RULES } from "./_lib.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (!onlyPost(req, res)) return;
  if (!(await requireUser(req, res))) return;

  try {
    const businessName = text(req.body?.businessName, 120);
    const industry = text(req.body?.industry, 120);
    const website = text(req.body?.website, 300);

    if (!businessName || !industry) {
      return res.status(400).json({ error: "businessName and industry are required" });
    }

    const prompt = `
Eres el agente de análisis de negocio de AIS-01, consultor de webs y automatización.

Negocio: ${businessName}
Sector: ${industry}
Web: ${website || "No indicada"}

Importante: NO has visitado la web. Trabaja solo con el nombre y el sector, y deja claro
que son hipótesis a comprobar, no hallazgos.

Devuelve en español:
1. Hipótesis generales sobre el negocio (marcadas como hipótesis)
2. Problemas de conversión habituales en este sector
3. Oportunidades de automatización realistas
4. Qué servicio le podría encajar y por qué
5. Preguntas que habría que hacerle antes de proponer nada
${HONESTY_RULES}`;

    const response = await client.responses.create({
      model: MODEL,
      input: prompt,
      max_output_tokens: MAX_OUTPUT_TOKENS,
    });

    return res.status(200).json({ result: response.output_text });
  } catch (error) {
    console.error("analyze-business", error?.message);
    return res.status(500).json({ error: "Agent failed" });
  }
}
