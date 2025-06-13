// backend/controllers/mpesaController.js

require('dotenv').config();

/**
 * Simulated M-Pesa STK Push — NO real Daraja call
 * Endpoint: POST /api/mpesa/stkpush
 */
const initiatePayment = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        message: 'Phone and amount are required.',
      });
    }

    console.log(`📲 Simulated M-Pesa payment: KES ${amount} from ${phone}`);

    const mockResponse = {
      MerchantRequestID: 'Mock12345',
      CheckoutRequestID: 'MockCheckout12345',
      ResponseCode: '0',
      ResponseDescription: 'Success. Request accepted for processing',
      CustomerMessage: 'Simulated STK push sent successfully',
    };

    return res.status(200).json(mockResponse);
  } catch (error) {
    console.error('❌ Simulated STK Push Error:', error.message);
    return res.status(500).json({
      message: 'STK Push failed',
      error: error.message,
    });
  }
};

/**
 * Freeze landlord M-Pesa account (simulated logic)
 * Endpoint: POST /api/mpesa/freeze
 */
const freezeAccount = async (req, res) => {
  try {
    const { landlordId, reason } = req.body;

    if (!landlordId || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Landlord ID and reason are required.',
      });
    }

    console.log(`🚫 Freezing account for landlord ${landlordId}. Reason: ${reason}`);

    return res.status(200).json({
      success: true,
      message: `Account for landlord ${landlordId} frozen successfully`,
    });
  } catch (error) {
    console.error('❌ Freeze Account Error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

module.exports = {
  initiatePayment,
  freezeAccount,
};
