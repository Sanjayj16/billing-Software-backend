// routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// ✅ Create a new invoice
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

// ✅ Get all invoices (sorted by latest first)
// GET /api/invoice/all
router.get('/all', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: invoices.length,
      invoices
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching invoices',
      error: error.message
    });
  }
});


router.get('/by-customer', async (req, res) => {
  const customerName = req.query.name;
  try {
    const invoices = await Invoice.find({ customerName });
    return res.json({
      success: true,
      count: invoices.length,
      invoices
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching invoices by customer',
      error: error.message
    });
  }
});

module.exports = router;
