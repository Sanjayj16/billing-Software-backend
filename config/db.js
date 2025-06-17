const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Establishes a connection to MongoDB via Mongoose.
 * @param {string} [uri] - Optional MongoDB connection URI. Falls back to MONGODB_URI env var or local default.
 */
const connectDB = async (uri) => {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://localhost:27017/billing_db';

  if (!mongoUri) {
    console.error('❌ No MongoDB URI provided.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
