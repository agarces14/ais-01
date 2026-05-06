import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { businessName, industry, website } = req.body;

    if (!businessName || !industry) {
      return res.status(400).json({
        error: "businessName and industry are required",
      });
    }

    const prompt = `
You are AIS-01 Lead Intelligence Agent.

Analyze this business as a premium AI automation and web systems consultant.

Business name: ${businessName}
Industry: ${industry}
Website: ${website || "Not provided"}

Return a structured analysis in Spanish with:

1. Diagnóstico general
2. Problemas probables de conversión
3. Oportunidades de automatización
4. Ideas de sistema IA vendible
5. Propuesta premium para enviar al cliente
6. Mensaje corto de outreach por email/Instagram

Make it practical, premium, direct and monetizable.
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return res.status(200).json({
      result: response.output_text,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Agent failed",
    });
  }
}
