import express from 'express';
import upload from '../services/fileHandle.js';
import {
  userLogin,
  userLogout,
  userRender,
  userSignup,
} from '../controllers/userController.js';
import { checkUserAuthentication } from '../middleware/authentication.js';
const route = express.Router();

route.get('/signup', (req, res) => {
  res.render('signup', {
    error: false,
    title: 'Signup',
    currentPage: 'signup',
    user: null,
  });
});
route.get('/login', (req, res) => {
  res.render('login', {
    error: false,
    title: 'Login',
    currentPage: 'login',
    user: null,
  });
});

route.post('/signup', upload.single('profileImage'), userSignup);
route.post('/login', userLogin);
route.get('/profile', checkUserAuthentication, userRender);
route.post('/logout', checkUserAuthentication, userLogout);

export default route;
