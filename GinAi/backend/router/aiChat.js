import express from 'express';
import { chatController } from '../controller/aiChat.js';

export const chatRouter = express.Router();
chatRouter.post('/chatting', chatController);
