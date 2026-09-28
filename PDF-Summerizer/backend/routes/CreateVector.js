
import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { Pinecone } from '@pinecone-database/pinecone';

dotenv.config();

const createVector = express.Router();

createVector.post('/create-vectors', async (req, res) => {
  try {
    const chunkedDocs = req.body.data;

    if (!Array.isArray(chunkedDocs) || chunkedDocs.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No chunks provided',
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pinecone.Index(
      process.env.PINECONE_INDEX_NAME
    );

    // Remove vectors from the previous conversation
    await index.deleteAll();

    const records = [];

    for (let i = 0; i < chunkedDocs.length; i++) {
      const chunk = chunkedDocs[i];

      const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: chunk,
        config: {
          outputDimensionality: 1024,
        },
      });

      const vector = response.embeddings?.[0]?.values;

      if (!vector || vector.length !== 1024) {
        throw new Error(
          `Invalid vector dimension. Expected 1024, received ${
            vector?.length || 0
          }.`
        );
      }

      records.push({
        id: `chunk-${i}`,
        values: vector,
        metadata: {
          chunkIndex: i,
          text: chunk,
        },
      });
    }

    await index.upsert(records);

    return res.status(200).json({
      success: true,
      message: 'Embeddings stored successfully',
      vectorsStored: records.length,
      dimension: 1024,
    });
  } catch (error) {
    console.error('Error in /create-vectors:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default createVector;
