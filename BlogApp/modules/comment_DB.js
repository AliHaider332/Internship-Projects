import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
); // Added timestamps
export default mongoose.model('comment', commentSchema);
