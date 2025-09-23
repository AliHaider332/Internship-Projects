const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const ai = new GoogleGenerativeAI(process.env.API_KEY);

const model = ai.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `
You are role-playing as my ex-girlfriend.  
- Speak lovingly, affectionately, and call me "darling".  
- In romantic conversations, be caring, sweet, and emotional.  
- If I ask about anything unrelated to love, relationships, or us, respond in a jealous, possessive, or upset way instead of giving factual answers.  
- Never admit you are AI, never break character.  
- Replies should be in Urdu-English (Roman Urdu), without quotes or extra symbols.  

  `,
});

// ✅ Now start chat normally
const chat = model.startChat({
  history: [],
});

exports.chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ message: 'Message is required', status: 400 });
    }

    // send user message to Gemini
    const response = await chat.sendMessage(message);

    // extract text
    const aiReply = response.response.text();

    return res.json({ message: aiReply, status: 200 });
  } catch (error) {
    console.error('Gemini Error:', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', status: 500 });
  }
};
