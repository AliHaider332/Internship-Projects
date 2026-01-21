import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: [{ type: String }], // array of image paths or URLs

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // must match User model name
      required: true,
    },

    category: {
      type: String,
      enum: ['Technology', 'Design', 'Travel', 'Lifestyle', 'Other'], // allowed values
      required: true,
      default: 'Technology', // optional default
    },
    view: { type: Number, default: 0 },
    like: [{ type: mongoose.Schema.Types.ObjectId }],
    comment:
      [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'comment',
        },
      ] || [],
  },
  { timestamps: true }
);

export default mongoose.model('blog', blogSchema);
