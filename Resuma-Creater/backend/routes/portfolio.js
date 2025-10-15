require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { main } = require('../utils/server');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => 
      `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

const portfolio = express.Router();

// POST Route for Data Collector
portfolio.post('/datacollector', upload.single('profileImage'), async (req, res) => {
  try {
    console.log('Request received:', req.body);
    
    const fileData = req.file;

    // Safe parsing with error handling
    const safeParse = (data, defaultValue = []) => {
      try {
        return data ? JSON.parse(data) : defaultValue;
      } catch (error) {
        console.error('JSON parse error:', error);
        return defaultValue;
      }
    };

    const formData = {
      name: req.body.name || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      summary: req.body.summary || '',
      skills: safeParse(req.body.skills),
      education: safeParse(req.body.education),
      experience: safeParse(req.body.experience),
      projects: safeParse(req.body.projects),
      profileImageUrl: fileData?.path || fileData?.secure_url || null,
    };

    console.log('Processed form data:', formData);

    // Generate HTML, CSS, and JS code using AI
    const { html, css, js, error } = await main(formData);

    if (error) {
      console.error('AI Generation Error:', error);
      return res.status(500).json({
        success: false,
        error: 'AI failed to generate portfolio code.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio generated successfully!',
      html: html || '',
      css: css || '',
      js: js || '',
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while processing request: ' + error.message,
    });
  }
});

// Test route
portfolio.get('/test', (req, res) => {
  res.json({ message: 'Portfolio route is working!' });
});

module.exports = { portfolio };