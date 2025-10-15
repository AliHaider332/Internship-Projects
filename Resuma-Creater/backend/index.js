const express = require('express');
const cors = require('cors');
const { portfolio } = require('./routes/portfolio');

// Load environment variables early
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Add this for JSON parsing
app.use(express.urlencoded({ extended: true })); // Add this for form data

// Routes
app.use('/api', portfolio);

// Root route - FIXED: Use proper status sending
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Generator API',
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 for all other routes - FIXED
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel (if needed)
module.exports = app;