const express = require('express');
const router = express.Router();
const { lipaNaMpesaOnline } = require('../controllers/mpesaController');
const { getMpesaStatement } = require('../utils/mpesaUtils');

// Route to initiate STK Push payment
router.post('/stkpush', async (req, res) => {
  try {
    const response = await lipaNaMpesaOnline(req.body);
    res.json({ success: true, response });
  } catch (error) {
    console.error('STK Push Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to request M-Pesa statement
router.post('/request-mpesa-statement', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  try {
    const statement = await getMpesaStatement(phoneNumber); // Implement this function
    res.json({ success: true, message: `Statement sent to ${phoneNumber}`, data: statement });
  } catch (error) {
    console.error('Statement Fetch Error:', error);
    res.status(500).json({ success: false, error: 'Could not fetch M-Pesa statement.' });
  }
});

module.exports = router;
