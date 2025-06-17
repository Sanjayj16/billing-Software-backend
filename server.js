const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const invoiceRoutes = require('./routes/invoiceRoutes');

// 1. Load environment variables
dotenv.config();

// 2. Initialize express app
const app = express();

// 3. Connect to MongoDB
connectDB(process.env.MONGODB_URI);

// 4. Middleware
app.use(cors());
app.use(express.json());

// 5. Root route for quick status check
app.get('/', (req, res) => {
  res.send("✅ Billing Software Backend is Live.");
});

// 6. Health check (optional)
app.get('/api/ping', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const sample = await db.collection('invoices').findOne();
    res.json({ ok: true, sample });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 7. Invoice routes
app.use('/api/invoice', invoiceRoutes);

// 8. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 9. Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('✖ Unhandled Rejection:', err);
  process.exit(1);
});
