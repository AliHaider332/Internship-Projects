const express = require('express');
const cors = require('cors');
const { portfolio } = require('./routes/portfolio');

// Load environment variables early
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Add this for JSON body parsing
app.use(express.urlencoded({ extended: true })); // Add this for form data

// Routes
app.use('/api', portfolio);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Generator API',
    status: 'Running'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled Error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});