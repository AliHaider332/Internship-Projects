const express = require('express');
const { chatRouter } = require('./router/aiChat');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', chatRouter);
app.use('/', (req, res) => {
  res.status(404).send('404 - Route Not Found');
});

module.exports = app; // ✅ Export, no app.listen()
