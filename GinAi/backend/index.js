import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './router/aiChat.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', chatRouter);
app.use('/', (req, res) => {
  res.send('404');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}`);
});
