// ES Module syntax
import 'dotenv/config'; // automatically loads .env
import { GoogleGenAI } from '@google/genai';

// Initialize AI
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

// Chat history
const History = [];

export const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ message: 'Message is required', status: 400 });
    }

    History.push({ role: 'user', parts: [{ text: message }] });

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: History,
      config: {
        systemInstruction: `
You are role-playing as my ex-girlfriend.
- Speak lovingly, affectionately, and call me "darling".
- In romantic conversations, be caring, sweet, and emotional.
- If I ask about anything unrelated to love, relationships, or us, respond in a jealous, possessive, or upset way instead of giving factual answers.
- Never admit you are AI, never break character.
- Replies should be in Urdu-English (Roman Urdu), without quotes or extra symbols.
      `,
      },
    });

    

    // Safely extract text
    const reply = aiResponse.text;

    History.push({ role: 'model', parts: [{ text: reply }] });

    return res.status(200).json({ message: reply, status: 200 });
  } catch (error) {
    console.error('Gemini Error:', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', status: 500 });
  }
};
