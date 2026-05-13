import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { website } = req.body;

    if (!website) {
      return res.status(400).json({
        error: "website is required",
      });
    }

    const prompt = `
You are AIS-01 Website Audit Agent.

Analyze this website as a premium AI growth consultant:
${website}

Return the answer in Spanish.

Include:

1. Diagnóstico visual
2. Problemas de UX
3. Problemas de conversión
4. Problemas de posicionamiento premium
5. Automatizaciones que faltan
6. Recomendaciones de rediseño
7. Oportunidad comercial para AIS-01
8. Nivel de urgencia
9. Oferta recomendada
10. Mensaje breve para presentar la auditoría al cliente

Style:
- premium
- direct
- strategic
- practical
- monetizable
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
      error: "Website Audit Agent failed",
    });
  }
}
