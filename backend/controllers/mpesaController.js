// controllers/mpesaController.js
require('dotenv').config();

// ================== MOCKED STK PUSH (No Daraja Call) ==================
const initiatePayment = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    console.log(`Simulated M-Pesa payment: KES ${amount} from ${phone}`);

    const mockResponse = {
      MerchantRequestID: 'Mock12345',
      CheckoutRequestID: 'MockCheckout12345',
      ResponseCode: '0',
      ResponseDescription: 'Success. Request accepted for processing',
      CustomerMessage: 'Simulated STK push sent successfully'
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('Simulated STK Push Error:', error.message);
    res.status(500).json({ message: 'STK Push failed', error: error.message });
  }
};

// ================== Freeze Account Controller ==================
const freezeAccount = async (req, res) => {
  try {
    console.log('Incoming freezeAccount request body:', req.body);

    const { landlordId, reason } = req.body;

    console.log(`Freezing account for landlord ${landlordId} - Reason: ${reason}`);

    res.status(200).json({
      success: true,
      message: `Account for landlord ${landlordId} frozen successfully`
    });
  } catch (error) {
    console.error('Freeze Account Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  initiatePayment,
  freezeAccount
};
