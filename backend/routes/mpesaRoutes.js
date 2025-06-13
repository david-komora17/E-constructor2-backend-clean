// backend/routes/mpesaRoutes.js

const express = require('express');
const router = express.Router();
const {
  freezeAccount,
  initiatePayment
} = require('../controllers/mpesaController');
const { getMpesaStatement } = require('../utils/mpesaUtils');

// 🔒 Freeze landlord M-Pesa account
router.post('/freeze', freezeAccount);

// 💸 Simulate M-Pesa STK Push payment
router.post('/stkpush', initiatePayment);

// 📄 Request M-Pesa statement
router.post('/request-mpesa-statement', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      error: 'Phone number is required',
    });
  }

  try {
    const statement = await getMpesaStatement(phoneNumber);
    return res.status(200).json({
      success: true,
      message: `Statement sent to ${phoneNumber}`,
      data: statement,
    });
  } catch (error) {
    console.error('❌ Statement Fetch Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Could not fetch M-Pesa statement.',
    });
  }
});

module.exports = router;
