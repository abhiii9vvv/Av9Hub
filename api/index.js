const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware - Enhanced CORS for production
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not defined');
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('🔄 Attempting MongoDB connection...');
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    cachedDb = connection;
    console.log('✅ MongoDB Connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Error details:', {
      name: error.name,
      code: error.code,
      hasMongoUri: !!process.env.MONGODB_URI
    });
    cachedDb = null;
    throw error;
  }
}

// Middleware to ensure DB connection on each request (non-blocking)
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('Database connection failed, continuing without DB:', error.message);
    // Don't block the request, let routes handle offline mode
  }
  next();
});

// Routes
app.use('/api/auth', require('../server/routes/auth'));
app.use('/api/users', require('../server/routes/users'));
app.use('/api/posts', require('../server/routes/posts'));
app.use('/api/comments', require('../server/routes/comments'));
app.use('/api/likes', require('../server/routes/likes'));
app.use('/api/follows', require('../server/routes/follows'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Av9Hub API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Export for Vercel serverless
module.exports = app;
