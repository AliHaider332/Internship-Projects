import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';

dotenv.config();
const createVector = express.Router();

createVector.post('/create-vectors', async (req, res) => {
  const chunkedDocs = req.body.data;

  try {
    // Step 1: Initialize Embeddings model
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: 'text-embedding-003',
    });

    // Step 2: Connect to Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    await pineconeIndex.deleteAll();

    // Step 3: Convert your string chunks into LangChain Documents
    const documents = chunkedDocs.map((chunk, i) => ({
      pageContent: chunk,
      metadata: { id: i },
    }));

    // Step 4: Upload to Pinecone
    await PineconeStore.fromDocuments(documents, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    res.json({ message: '✅ Embeddings stored successfully!', status: 200 });
  } catch (error) {
    console.error('❌ Error in /setup route:', error);
    res.status(500).json({ error: error.message });
  }
});

export default createVector;
