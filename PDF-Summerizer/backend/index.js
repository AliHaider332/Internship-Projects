import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createVector from './routes/CreateVector.js';
import chatting from './routes/Chatting.js';

dotenv.config();

const app = express();

// ✅ Simple CORS setup for your exact frontend
const frontendUrl = (process.env.FRONTEND_URL || '').replace(/\/$/, ''); // removes trailing "/"

app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' }));

// ✅ Routes
app.use('/api', createVector);
app.use('/api', chatting);


import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const response = await ai.models.embedContent({
  model: 'gemini-embedding-001',
  contents: 'Hello world',
  config: {
    outputDimensionality: 1024,
  },
});

const vector = response.embeddings[0].values;

console.log('VECTOR LENGTH:', vector.length);

app.get('/', (req, res) => {
  res.send('🚀 Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
