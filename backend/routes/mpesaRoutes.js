const express = require('express');
const router = express.Router();
const { freezeAccount, initiatePayment } = require('../controllers/mpesaController'); // ✅ use initiatePayment instead
const { getMpesaStatement } = require('../utils/mpesaUtils');

// Freeze landlord account
router.post('/freeze', freezeAccount);


// STK Push for payments
router.post('/stkpush', initiatePayment); // ✅ use initiatePayment, not lipaNaMpesaOnline

// Send M-Pesa statement
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
    res.json({
      success: true,
      message: `Statement sent to ${phoneNumber}`,
      data: statement,
    });
  } catch (error) {
    console.error('❌ Statement Fetch Error:', error);
    res.status(500).json({
      success: false,
      error: 'Could not fetch M-Pesa statement.',
    });
  }
});

module.exports = router;
