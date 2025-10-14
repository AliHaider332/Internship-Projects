const express = require('express');
const cors = require('cors');
const { portfolio } = require('./routes/portfolio');

const app = express();
app.use(cors());

app.use(portfolio);

app.listen(process.env.PORT, () => {});
