import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createVector from './routes/CreateVector.js';
import chatting from './routes/Chatting.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', createVector);
app.use('/api',chatting)

app.get('/', (req, res) => {
  res.send('🚀 Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
