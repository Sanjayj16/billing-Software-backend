// routes/invoiceRoutes.js
const express = require('express');
const router  = express.Router();
const Invoice = require('../models/Invoice');

// POST /api/invoice/create-invoice
router.post('/create-invoice', async (req, res) => {
  console.log('Backend received invoice:', req.body);
  try {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    return res.status(201).json({
      message: 'Invoice saved successfully',
      invoice: savedInvoice
    });
  } catch (error) {
    console.error('Error saving invoice:', error);
    return res.status(500).json({
      message: 'Error saving invoice',
      error: error.message
    });
  }
});

// GET /api/invoice
// Returns all invoices (useful for verification)
router.get('/', async (_req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    return res.json({ count: invoices.length, invoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return res.status(500).json({
      message: 'Error fetching invoices',
      error: error.message
    });
  }
});

module.exports = router;
