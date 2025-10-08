const express = require('express');
const { chatRouter } = require('./router/aiChat');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', chatRouter);
app.use('/', (req, res) => {
  res.send('404');
});

app.listen(process.env.PORT);
