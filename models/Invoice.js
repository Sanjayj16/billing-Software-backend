const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: String,
  code: String,
  qty: Number,
  unit: String,
  rate: Number,
  discount: Number,
  tax: Number,
  total: Number,
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  invoiceDate: String,
  dueDate: String,
  customerName: String,
  contact: String,
  gstin: String,
  address: String,
  billItems: [ItemSchema],
  otherCharges: Number,
  totalDiscount: Number,
  taxTotal: Number,
  grandTotal: Number,
  paymentMode: String,
  amountPaid: Number,
  balanceAmount: Number,
  notes: String,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
