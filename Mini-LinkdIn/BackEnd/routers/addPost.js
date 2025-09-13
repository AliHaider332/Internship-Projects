const express = require('express');
const multer = require('multer');
const path = require('path');
const { addPostController } = require('../controller/posts');

const addPostRouter = express.Router();

// Multer storage for post pictures
const postPicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/Posts/'); // ✅ corrected "cb"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadPostPic = multer({ storage: postPicStorage });

// Route
addPostRouter.post(
  '/add-post',
  uploadPostPic.fields([{ name: 'postPic' },{name:'video'}]), // ✅ middleware name clarified
  addPostController
);

module.exports = { addPostRouter };
