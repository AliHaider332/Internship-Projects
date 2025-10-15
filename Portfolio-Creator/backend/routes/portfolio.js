require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { main } = require('../utils/server');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration with error handling
if (
  !process.env.CLOUD_NAME ||
  !process.env.CLOUD_API_KEY ||
  !process.env.CLOUD_API_SECRET
) {
  console.error('❌ Cloudinary environment variables are missing');
}

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
    fileSize: 5 * 1024 * 1024,
  },
});

const portfolio = express.Router();

// Test route
portfolio.get('/test', (req, res) => {
  res.json({
    message: 'Portfolio route is working!',
    timestamp: new Date().toISOString(),
  });
});

// POST Route for Data Collector
portfolio.post(
  '/datacollector',
  upload.single('profileImage'),
  async (req, res) => {
    try {
      // Check if GENAI_API_KEY is available
      if (!process.env.GENAI_API_KEY) {
        return res.status(500).json({
          success: false,
          error: 'AI service configuration missing',
        });
      }

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
        links: safeParse(req.body.links), // new: social links (GitHub, LinkedIn, etc.)
        theme: req.body.theme || '', // new: user's theme and color explanation
        profileImageUrl: fileData?.path || fileData?.secure_url || null,
      };

      // Generate HTML, CSS, and JS code using AI
      const { html, css, js, error } = await main(formData);

      if (error) {
        console.error('AI Generation Error:', error);
        return res.status(500).json({
          success: false,
          error: 'AI failed to generate portfolio code: ' + error,
        });
      }

      // Check if we actually got content
      if (!html && !css && !js) {
        return res.status(500).json({
          success: false,
          error: 'AI returned empty response',
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
  }
);

module.exports = { portfolio };
