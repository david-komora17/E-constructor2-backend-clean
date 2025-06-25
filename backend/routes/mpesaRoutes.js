// backend/routes/mpesaRoutes.js

const express = require('express');
const router = express.Router();
const {
  freezeAccount,
  initiatePayment
} = require('../controllers/mpesaController');

const { getMpesaStatement } = require('../utils/mpesaUtils');

// ================================
// 🔐 Freeze Landlord M-Pesa Account
// ================================
router.post('/freeze-account', freezeAccount); // renamed for clarity

// ================================
// 💰 Simulate M-Pesa STK Push
// ================================
router.post('/stkpush', initiatePayment); // for rent payments or registration

// ================================
// 📄 Simulated M-Pesa Statement Request
// ================================
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
    console.error('❌ Statement Fetch Error:', error.message || error);
    return res.status(500).json({
      success: false,
      error: 'Could not fetch M-Pesa statement.',
    });
  }
});

module.exports = router;
