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

app.use(express.json());

// ✅ Routes
app.use('/api', createVector);
app.use('/api', chatting);

app.get('/', (req, res) => {
  res.send('🚀 Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
