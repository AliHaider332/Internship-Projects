const mongoose = require('mongoose');

const userPost = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'USER', required: true },
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String },
  pic: { type: String },
  video: { type: String },
  tags: { type: [String], default: [] },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'USER', default: [] }],
  comment: [
    {
      u_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
      },
      comment: { type: String, required: true },
      name: { type: String },
      pic: { type: String },
    },
  ],
});

module.exports = mongoose.model('POST', userPost);
