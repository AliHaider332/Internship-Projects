import blog from '../modules/blog_DB.js';
import comment from '../modules/comment_DB.js';
import { uploadToCloudinary } from '../services/File_upload.js';
// import user from '../modules/user_DB.js';
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blog
      .find()
      .populate('author', 'name profile_image username') // <-- correct field names
      .sort({ createdAt: -1 }); // optional: newest first
    // console.log(req.user);

    res.render('Home', {
      blogs: allBlogs,
      title: 'Home',
      currentPage: 'home',
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.render('wrong', { message: 'Something went wrong' });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const user = req.user;
    const UserBlog = (await blog.find({ author: user.id })) || [];

    res.render('userDashboard', {
      blogs: UserBlog,
      blogToEdit: false,
      title: 'Dashboard',
      currentPage: 'Dashboard',
      user: req.user || null,
    });
  } catch (error) {
    res.render('wrong', { message: 'Some thing Wrong' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const user = req.user;

    const { title, description, category } = req.body;
    if (!title || !description) {
      return res.render('wrong', { message: 'All fields are required' });
    }
    const images = [];
    if (req.files && req.files.length > 0) {
      // Upload all images in parallel
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer, 'blogs')
      );
      const results = await Promise.all(uploadPromises);
      results.forEach((r) => images.push(r.secure_url));
    }
    const newBlog = new blog({
      title,
      description,
      category,
      image: images, // store array of image paths
      author: user.id,
      comment: [],
    });
    await newBlog.save();
    res.redirect('/my-blog');
  } catch (error) {
    res.render('wrong', { message: 'Some thing Wrong' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await blog.findByIdAndDelete(id);
    res.redirect('/my-blog');
  } catch (error) {
    res.render('wrong', { message: 'Some thing Wrong' });
  }
};
export const editBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the blog to edit
    const post = await blog.findById(id);
    if (!post) {
      return res.render('wrong', { message: 'Blog not found' });
    }

    // Fetch all blogs of the user
    const userBlogs = await blog.find({ author: req.user.id });

    // Render the dashboard with blogs + blogToEdit
    res.render('userDashboard', {
      blogs: userBlogs,
      blogToEdit: post,
      title: 'Dashboard',
      currentPage: 'Dashboard',
      user: req.user || null,
    });
  } catch (error) {
    console.error(error);
    res.render('wrong', { message: 'Something went wrong' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const images = [];
    if (req.files && req.files.length > 0) {
      // Upload all images in parallel
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer, 'blogs')
      );
      const results = await Promise.all(uploadPromises);
      results.forEach((r) => images.push(r.secure_url));
    }

    await blog.findByIdAndUpdate(id, {
      title,
      description,
      category,
      $push: { image: { $each: images } }, // optional: add new images
    });

    res.redirect('/my-blog');
  } catch (err) {
    res.render('wrong', { message: 'Error updating blog' });
  }
};

export const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.redirect('/');

    const r_blog = await blog
      .findById(id)
      .populate('author', 'name username profile_image')
      .populate({
        path: 'comment', // ✅ Changed from 'comment' to 'comments'
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          select: 'name username image profile_image',
        },
      });

    if (!r_blog) return res.redirect('/');

    r_blog.view += 1;
    await r_blog.save();

    const userId = req.user?.id;
    const liked = userId && r_blog.like.some((id) => id.toString() === userId);
    // console.log(r_blog);
    // return res.redirect('/')

    res.render('SingleBlog', {
      blog: r_blog,
      liked,
      title: r_blog.title,
      currentPage: 'Blog',
      user: req.user || null,
    });
  } catch (error) {
    console.error(error);
    res.render('wrong', {
      message: 'Error loading blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : null,
    });
  }
};

export const toggleLikeController = async (req, res) => {
  try {
    const blogId = req.params.id;
   

    const userId = req.user.id;

    const b = await blog.findById(blogId);
    if (!b) return res.redirect(`/blogs/${blogId}`);
    const alreadyLiked = b.like.includes(userId);

    if (alreadyLiked) {
      // unlike
      b.like.pull(userId);
    } else {
      // like
      b.like.push(userId);
    }

    await b.save();
    res.redirect(`/blogs/${blogId}`);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.render('wrong', {
      message: 'Error loading blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : null,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // blog id
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.redirect(`/blogs/${id}`);
    }

    // 1️⃣ Create comment
   

    const newComment = await comment.create({
      blog: id,
      user: req.user.id,
      content: content,
    });

    // 2️⃣ Push comment id into blog
    await blog.findByIdAndUpdate(id, {
      $push: { comment: newComment._id },
    });

    // 3️⃣ Redirect back
    res.redirect(`/blogs/${id}`);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.render('wrong', {
      message: 'Failed to add comment',
      error: process.env.NODE_ENV === 'development' ? error.message : null,
    });
  }
};
