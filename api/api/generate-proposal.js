import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { businessName, industry, problem, budgetLevel } = req.body;

    if (!businessName || !industry) {
      return res.status(400).json({
        error: "businessName and industry are required",
      });
    }

    const prompt = `
You are AIS-01 Proposal Agent.

Create a premium commercial proposal in Spanish for this business.

Business:
${businessName}

Industry:
${industry}

Main problem/opportunity:
${problem || "Needs better digital presence, automation and lead conversion."}

Budget level:
${budgetLevel || "medium"}

Return:

1. Resumen ejecutivo
2. Problema principal detectado
3. Solución propuesta por AIS-01
4. Sistema recomendado
5. Paquete recomendado
6. Precio sugerido
7. Qué incluye
8. Beneficio esperado
9. Mensaje comercial para enviar al cliente
10. Próximo paso para cerrar

Style:
- premium
- direct
- strategic
- business-focused
- not generic
- written like a high-end AI systems studio
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
      error: "Proposal Agent failed",
    });
  }
}
