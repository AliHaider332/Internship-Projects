import express from 'express';
import upload from '../services/fileHandle.js';
import {
  checkAuthorize,
  checkUserAuthentication,
  checkUserAuthenticationFirst,
} from '../middleware/authentication.js';
import {
  addComment,
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getSingle,
  getUserBlogs,
  toggleLikeController,
  updateBlog,
} from '../controllers/blogController.js';

const bloger = express.Router();

bloger.get('/', checkUserAuthenticationFirst, getAllBlogs);

bloger.get('/my-blog', checkUserAuthentication, checkAuthorize, getUserBlogs);
bloger.post(
  '/create-blog',
  checkUserAuthentication,
  upload.array('photos', 5),
  createBlog
);

bloger.post(
  '/deleteBlog/:id',
  checkUserAuthentication,
  checkAuthorize,
  deleteBlog
);

bloger.get('/editBlog/:id', checkUserAuthentication, checkAuthorize, editBlog);

bloger.post(
  '/updateBlog/:id',
  checkUserAuthentication,
  checkAuthorize,
  upload.array('photos', 5),
  updateBlog
);

bloger.get('/blogs/:id', checkUserAuthenticationFirst, getSingle);
bloger.get('/blog/like/:id', checkUserAuthentication, toggleLikeController);
bloger.post('/blogs/:id/comment', checkUserAuthentication, addComment);

export default bloger;
