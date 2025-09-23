const express = require('express');
const { chatController } = require('../controller/aiChat');
const chatRouter = express.Router();
chatRouter.post('/chatting', chatController);
module.exports = { chatRouter };
