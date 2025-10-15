const express = require('express');
const cors = require('cors');
const { portfolio } = require('./routes/portfolio');

const app = express();
app.use(cors());

app.use('/api',portfolio);
app.use('/', (req, res) => {
  res.send(404);
});

app.listen(process.env.PORT, () => {});
