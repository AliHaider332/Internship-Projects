import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import route from './routes/userHandler.js';
import bloger from './routes/blogHandler.js';
import cookieParse from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import './modules/user_DB.js';
import './modules/blog_DB.js';
import './modules/comment_DB.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(urlencoded({ extends: true }));
app.use(cookieParse());

app.use(route);
app.use(bloger);
app.use('', (req, res) => {
  res.render('wrong', { message: '404' });
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    // console.log('Successful');
    // console.log(mongoose.modelNames());
  })
  .catch((e) => {
    console.log('Error in DB', e);
  });
app.listen(process.env.PORT, () => {
  console.log('Server is running on 3000 Port');
});
