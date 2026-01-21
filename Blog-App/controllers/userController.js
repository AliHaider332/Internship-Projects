import user from '../modules/user_DB.js';
import blog from '../modules/blog_DB.js';
import bcrypt from 'bcrypt';
import { createToken } from '../services/JWT.js';
import { uploadToCloudinary } from '../services/File_upload.js';

import dotenv from 'dotenv';
dotenv.config();

export const userSignup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await user.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.render('Signup', {
        error: 'User already exists',
        title: 'Signup',
        currentPage: 'signup',
        user: null,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Fix: Store image path correctly and ensure forward slashes
    let profileImageUrl;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      profileImageUrl = result.secure_url; // Cloudinary URL
    }

    // Create new user
    const newUser = new user({
      name,
      username,
      email,
      password: hashedPassword,
      profile_image: profileImageUrl, // This will be stored in DB
    });

    await newUser.save();

    // Redirect to login page
    return res.render('Login', {
      error: false,
      title: 'Login',
      currentPage: 'login',
      user: null,
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).render('Signup', {
      error: 'Server error. Please try again.',
      title: 'Signup',
      currentPage: 'signup',
      user: null,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { identity, password } = req.body;

    // Find user by email or username
    const existingUser = await user.findOne({
      $or: [{ email: identity }, { username: identity }],
    });

    if (!existingUser) {
      return res.render('Login', {
        error: 'You are not registered',
        title: 'Login',
        currentPage: 'login',
        user: null,
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.render('Login', {
        error: 'Invalid password',
        title: 'Login',
        currentPage: 'login',
        user: null,
      });
    }

    // Create token and set cookie
    const token = await createToken(existingUser);
    res.cookie('s_id', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 24 hours
    });

    // Pass the user object to the template
    return res.redirect('/my-blog');
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).render('Login', {
      error: 'Server error. Please try again.',
      title: 'Login',
      currentPage: 'login',
      user: null,
    });
  }
};

// controllers/userController.js
export const userRender = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).render('wrong', {
        message: 'User not authenticated. Please log in.',
      });
    }

    const userData = {
      name: req.user.name || 'User',
      email: req.user.email,
      username: req.user.username,
      profileImage: req.user.image,

      role: req.user.role || 'user',
    };

    const userId = req.user.id;

    // Get all blogs by this user
    const blogs = await blog.find({ author: userId });

    // Calculate totals
    const b_count = blogs.length;
    let totalViews = 0;
    let totalLikes = 0;

    blogs.forEach((blog) => {
      totalViews += blog.view || 0;
      totalLikes += blog.like ? blog.like.length : 0;
    });

    res.render('user-profile', {
      title: `${userData.name}'s Profile`,
      user: userData,
      currentPage: 'profile',
      title: 'Login',
      currentPage: 'login',
      user: req.user,
      b_count,
      totalViews,
      totalLikes,

      // Changed from 'wrong' to 'error'
    });
  } catch (error) {
    console.error('Error rendering user profile:', error);
    res.status(500).render('wrong', {
      message: 'Something went wrong. Please try again later.',
    });
  }
};

export const userLogout = (req, res) => {
  res.clearCookie('s_id', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return res.redirect('/login');
};
