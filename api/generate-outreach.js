import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { businessName, industry, platform, goal } = req.body;

    if (!businessName || !industry) {
      return res.status(400).json({
        error: "businessName and industry are required",
      });
    }

    const prompt = `
You are AIS-01 Outreach Agent.

Create a premium, personalized outreach message in Spanish.

Business:
${businessName}

Industry:
${industry}

Platform:
${platform || "email"}

Goal:
${goal || "Offer a premium AI automation and web system"}

Return:

1. Mensaje principal para ${platform}
2. Versión más corta
3. Follow-up 1
4. Follow-up 2
5. Subject line if email
6. CTA final

Style:
- natural
- premium
- not spammy
- direct
- human
- persuasive
- no exaggerated promises
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
      error: "Outreach Agent failed",
    });
  }
}
