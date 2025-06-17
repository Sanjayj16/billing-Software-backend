const bills = require('../models/Bill');

exports.createBill = (req, res) => {
  const newBill = req.body;
  bills.push(newBill);
  res.status(201).json({ message: 'Bill created', data: newBill });
};

exports.getBills = (req, res) => {
  res.json(bills);
};