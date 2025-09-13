const POST = require('../module/postShema');
const fs = require('fs');
const path = require('path');
exports.addPostController = async (req, res) => {
  try {
    const { author, title, description, tags } = req.body;
    const { postPic, video } = req.files || {};

    if (!author || !title) {
      return res.status(400).json({
        success: false,
        msg: 'Author and title are required',
      });
    }

    const post = new POST({
      author,
      date: new Date(),
      title,
      description,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      pic: postPic && postPic[0] ? postPic[0].path : null,
      video: video && video[0] ? video[0].path : null,
    });

    await post.save();

    return res.status(201).json({
      success: true,
      msg: 'Post successfully created',
      post, // return the created post if needed
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message,
    });
  }
};

exports.getAllPostController = async (req, res) => {
  try {
    const posts = await POST.find().populate('author', 'name pic');
    // console.log(posts);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched data',
      DATA: posts,
    });
  } catch (error) {
    console.error('Error in getAllPostController:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.likeController = async (req, res) => {
  try {
    const { id, viewerId } = req.body;

    const post = await POST.findById(id);
    if (!post) {
      return res.status(404).json({ status: 404, message: 'Post not found' });
    }

    // check if viewerId already exists in like array
    const alreadyLiked = post.like.includes(viewerId);

    if (alreadyLiked) {
      // unlike → remove viewerId
      post.like = post.like.filter((uid) => uid.toString() !== viewerId);
    } else {
      // like → add viewerId
      post.like.push(viewerId);
    }

    await post.save();

    res.status(200).json({
      status: alreadyLiked ? 201 : 200,
      message: alreadyLiked ? 'Unliked successfully' : 'Liked successfully',
      likesCount: post.like.length,
      likes: post.like,
    });
  } catch (error) {
    console.error('Error in likeController:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.commentController = async (req, res) => {
  try {
    const { id, viewerId, name, pic, comment } = req.body;
    const data = await POST.findById(id);
    if (!data) {
      return res.status(404).json({ status: 404, message: 'Post not found' });
    }
    // console.log(id, viewerId, name, pic, comment);

    const informationRequired = {
      u_id: viewerId,
      comment: comment,
      name: name,
      pic: pic,
    };
    data.comment.push(informationRequired);
    await data.save();
    return res.status(200).json({ status: 200, message: 'Successfully Added' });
  } catch (error) {
    console.error('Error in likeController:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id, c_id, message } = req.body; // postId, commentId, newMessage

    const data = await POST.findById(id);
    if (!data) {
      return res.status(404).json({ status: 404, message: 'Post not found' });
    }

    // Find the comment inside post
    const comment = data.comment.id(c_id); // Mongoose gives direct access by subdocument id
    if (!comment) {
      return res
        .status(404)
        .json({ status: 404, message: 'Comment not found' });
    }

    // Update the comment
    comment.comment = message;

    // Save changes
    await data.save();

    return res.status(200).json({
      status: 200,
      message: 'Comment updated successfully',
      updatedComment: comment,
    });
  } catch (error) {
    console.error('Error in updateComment:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id, c_id } = req.body; // postId, commentId

    const data = await POST.findById(id);
    if (!data) {
      return res.status(404).json({ status: 404, message: 'Post not found' });
    }

    const comment = data.comment.id(c_id).comment;
    if (!comment) {
      return res
        .status(404)
        .json({ status: 404, message: 'Comment not found' });
    }

    return res.status(200).json({
      comment,
    });
  } catch (error) {
    console.error('Error in getCommentById:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id, c_id } = req.body; // postId, commentId
    const data = await POST.findById(id);

    if (!data) {
      return res.status(404).json({ status: 404, message: 'Post not found' });
    }

    // Find the comment

    data.comment = data.comment.filter((cmt) => cmt._id != c_id);
    await data.save();

    return res.status(200).json({
      status: 200,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteComment:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// controller
exports.myPosts = async (req, res) => {
  try {
    const { id } = req.body; // this is user id

    const posts = await POST.find({ author: id });

    return res.status(200).json({
      status: 200,
      message: 'User posts fetched successfully',
      data: posts,
    });
  } catch (error) {
    console.error('Error in myPosts:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the post
    const post = await POST.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete pic file if exists
    if (post.pic) {
      const filePath = path.join(__dirname, '..', post.pic); // adjust if needed
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }

    // Delete video file if exists
    if (post.video) {
      const videoPath = path.join(__dirname, '..', post.video);
      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error('Error deleting video:', err);
        }
      });
    }

    // Delete post from DB
    await POST.findByIdAndDelete(id);

    return res.status(200).json({
      status: 200,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error in deletePost:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.findPostById = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await POST.findById(id);

    if (!data) {
      return res.status(404).json({ status: 404, message: 'Post not found' });
    }

    return res.status(200).json({ status: 200, post: data });
  } catch (error) {
    console.error('Error in findPostById:', error);
    return res.status(500).json({ status: 500, message: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id, title, description, tags } = req.body;

    // Step 1: Find the post
    const data = await POST.findById(id);
    if (!data) {
      return res.status(404).json({ status: 404, message: 'Post not found' });
    }

    // Step 2: Extract uploaded files
    const { postPic, video } = req.files || {};
    const requiredPic = postPic ? postPic[0].path : null;
    const requiredVideo = video ? video[0].path : null;

    // Step 3: Update fields
    if (title) data.title = title;
    if (description) data.description = description;
    if (tags) {
      data.tags = tags.split(',').map((t) => t.trim());
    }

    // Step 4: Handle new files & safely delete old ones
    if (requiredPic) {
      if (data.pic && fs.existsSync(data.pic)) {
        fs.unlink(data.pic, (err) => {
          if (err) console.error('Failed to delete old pic:', err);
        });
      }
      data.pic = requiredPic;
    }

    if (requiredVideo) {
      if (data.video && fs.existsSync(data.video)) {
        fs.unlink(data.video, (err) => {
          if (err) console.error('Failed to delete old video:', err);
        });
      }
      data.video = requiredVideo;
    }

    // Step 5: Save updated post
    await data.save();

    // Step 6: Respond
    return res.status(200).json({
      status: 200,
      message: 'Post updated successfully',
      updatedPost: data,
    });
  } catch (error) {
    console.error('Error in updatePost:', error);
    return res.status(500).json({ status: 500, message: 'Server error' });
  }
};
