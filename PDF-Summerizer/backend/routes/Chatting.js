import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { Pinecone } from '@pinecone-database/pinecone';

dotenv.config();

const chatting = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(
  process.env.PINECONE_INDEX_NAME
);

// Temporary in-memory conversation history
const History = [];

chatting.post('/chatting', async (req, res) => {
  try {
    const question = req.body.message?.trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question is required.',
      });
    }

    /*
     * =====================================================
     * 1. EMBED USER QUESTION
     * =====================================================
     *
     * Must use the SAME embedding model and dimension
     * used when storing PDF chunks.
     */

    const embeddingResponse = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: question,
      config: {
        outputDimensionality: 1024,
      },
    });

    const queryVector =
      embeddingResponse.embeddings[0].values;

    console.log(
      'Query vector dimension:',
      queryVector.length
    );

    if (queryVector.length !== 1024) {
      throw new Error(
        `Invalid query vector dimension: ${queryVector.length}. Expected 1024.`
      );
    }

    /*
     * =====================================================
     * 2. SEARCH PINECONE
     * =====================================================
     */

    const searchResults = await pineconeIndex.query({
      vector: queryVector,
      topK: 5,
      includeMetadata: true,
    });

    console.log(
      'Matches found:',
      searchResults.matches?.length || 0
    );

    /*
     * =====================================================
     * 3. BUILD CONTEXT
     * =====================================================
     */

    const context = (searchResults.matches || [])
      .filter((match) => match.metadata?.text)
      .map(
        (match, index) =>
          `Source ${index + 1}:\n${match.metadata.text}`
      )
      .join('\n\n---\n\n');

    if (!context) {
      return res.status(200).json({
        success: true,
        answer:
          'I could not find relevant information in the provided document.',
      });
    }

    /*
     * =====================================================
     * 4. ADD USER QUESTION TO HISTORY
     * =====================================================
     */

    History.push({
      role: 'user',
      parts: [
        {
          text: question,
        },
      ],
    });

    /*
     * =====================================================
     * 5. GENERATE ANSWER
     * =====================================================
     */

    const response = await ai.models.generateContent({
     model: 'gemini-2.5-flash',

      contents: History,

      config: {
        systemInstruction: `
You are a helpful PDF instructor.

You will receive:
1. Relevant context retrieved from a PDF.
2. A user's question.

Answer the user's question using ONLY the provided context.

Rules:

1. Do not use outside knowledge.
2. Do not invent or assume information.
3. If the answer cannot be found in the context, say exactly:
"I could not find the answer in the provided document."
4. Keep the answer clear, concise, and educational.
5. Use Markdown formatting when it improves readability.
6. You may use **bold**, *italic*, bullet points, and numbered lists.
7. Do not mention the retrieval process unless the user asks about it.

Relevant PDF Context:

${context}
        `,
      },
    });

    const answer = response.text;

    /*
     * =====================================================
     * 6. ADD MODEL RESPONSE TO HISTORY
     * =====================================================
     */

    History.push({
      role: 'model',
      parts: [
        {
          text: answer,
        },
      ],
    });

    /*
     * =====================================================
     * 7. SEND RESPONSE
     * =====================================================
     */

    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error('❌ Error in /chatting:', error);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
      error: error.message,
    });
  }
});

export default chatting;