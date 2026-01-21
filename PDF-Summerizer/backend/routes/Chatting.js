import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from '@google/genai';

const chatting = express.Router();
dotenv.config();
const ai = new GoogleGenAI({});
const History = [];

chatting.post('/chatting', async (req, res) => {
  try {
    const question = req.body.message;
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: 'text-embedding-003',
    });

    const queryVector = await embeddings.embedQuery(question);
    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    const searchResults = await pineconeIndex.query({
      topK: 10,
      vector: queryVector,
      includeMetadata: true,
    });

    const context = searchResults.matches
      .map((match) => match.metadata.text)
      .join('\n\n---\n\n');

    History.push({
      role: 'user',
      parts: [{ text: question }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: History,
      config: {
        systemInstruction: `You have to behave like an instucture.
      You will be given a context of relevant information and a user question. 
      Your task is to answer the user's question based ONLY on the provided context and make it a litle bit polish in bounding the context that will given. You may try bold italic like sentense structure to understande the user in better way.
      If the answer is not in the context, you must say "I could not find the answer in the provided document."
      Keep your answers clear, concise, and educational.
        
        Context: ${context}
        `,
      },
    });

    History.push({
      role: 'model',
      parts: [{ text: response.text }],
    });

    res.status(200).json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    console.error('Error in /chatting:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
      error: error.message,
    });
  }
});

export default chatting;
