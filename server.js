// server.js (or index.js)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const invoiceRoutes = require('./routes/invoiceRoutes');

// 1. Load .env into process.env
dotenv.config();

const app = express();

// 2. Connect to MongoDB
connectDB(process.env.MONGODB_URI);

// 3. Middleware
app.use(cors());
app.use(express.json());

// ✅ Default route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send("✅ Billing software backend is running.");
});

// 4. Health check / ping route
app.get('/api/ping', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const sample = await db.collection('invoices').findOne();
    res.json({ ok: true, sample });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 5. Invoice routes
app.use('/api/invoice', invoiceRoutes);

// 6. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 7. Global unhandled rejection handler
process.on('unhandledRejection', (err) => {
  console.error('✖ Unhandled Rejection:', err);
  process.exit(1);
});
