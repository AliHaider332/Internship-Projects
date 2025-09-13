const USER = require('../module/dbSchema');
const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const path = require('path');
const { check, validationResult } = require('express-validator');
exports.accountDetailController = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await USER.findById(id);
    return res
      .status(200)
      .json({ status: 200, message: 'got request', user: data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: 'Internal Server Error' });
  }
};

exports.profileUpdateController = [
  // 🔹 Name validation
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must contain only letters and spaces'),

  // 🔹 Email validation
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  // 🔹 Phone validation
  check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  // 🔹 Address validation
  check('address')
    .optional()
    .isLength({ min: 5 })
    .withMessage('Address must be at least 5 characters long'),

  // 🔹 Password validation (optional for updates)
  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$#<>^~!%*?&]/)
    .withMessage('Password must contain at least one special character'),

  // 🔹 Confirm Password validation
  check('confirmPassword')
    .optional()
    .custom((value, { req }) => {
      if (req.body.password && value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  // 🔹 Controller logic
  async (req, res) => {
    try {
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          errors: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        });
      }

      const { id, name, email, phone, address, password } = req.body;
      const user = await USER.findById(id);
      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }

      // Handle profile picture
      let pic = user.pic;
      if (req.file) {
        if (pic) {
          try {
            await fs.unlink(pic); // delete old pic
          } catch (err) {
            console.warn('Error deleting old file:', err.message);
          }
        }
        pic = req.file.path;
      }

      // Hash password if provided
      let hashedPassword = user.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Update user
      const updatedUser = await USER.findByIdAndUpdate(
        id,
        { name, email, phone, address, pic, password: hashedPassword },
        { new: true }
      );

      return res.status(201).json({
        status: 201,
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  },
];

exports.deleteAccountController = async (req, res) => {
  try {
    const { id, password } = req.body;

    const data = await USER.findById(id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    const result = await bcrypt.compare(password, data.password);
    if (!result) {
      return res.status(401).json({
        status: 401,
        message: 'Incorrect password',
      });
    }

    // ✅ Safely delete profile picture if exists
    if (data.pic) {
      const filePath = path.join(__dirname, '..', data.pic);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error('Error deleting profile picture:', err);
        } else {
          console.warn('Profile picture not found:', filePath);
        }
      }
    }

    await USER.findByIdAndDelete(id);
    return res.status(200).json({
      status: 200,
      message: 'Account successfully deleted',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};
