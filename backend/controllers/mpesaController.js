const axios = require('axios');
const dayjs = require('dayjs');
require('dotenv').config();

// ================== Get Access Token ==================
const getAccessToken = async () => {
  const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const headers = {
    Authorization: `Basic ${auth}`,
  };

  const response = await axios.get(url, { headers });
  return response.data.access_token;
};

// ================== Lipa Na M-Pesa ==================
const lipaNaMpesaOnline = async (phone, amount) => {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = dayjs().format('YYYYMMDDHHmmss');
  const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

  const accessToken = await getAccessToken();

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: 'E-Constructor',
    TransactionDesc: 'Building Complaint Fee'
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  const response = await axios.post(url, payload, { headers });
  return response.data;
};

// ================== Controller Handler ==================
const initiatePayment = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const result = await lipaNaMpesaOnline(phone, amount);
    res.status(200).json(result);
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'STK Push failed', error: error.message });
  }
};

// ================== Freeze Account Controller ==================
const freezeAccount = async (req, res) => {
  try {
    console.log('Incoming freezeAccount request body:', req.body); // Debug log

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
  freezeAccount // ✅ Add this line
};



