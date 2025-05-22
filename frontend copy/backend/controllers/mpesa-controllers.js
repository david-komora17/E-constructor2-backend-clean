// backend/controllers/mpesaController.js
const axios = require("axios");
require("dotenv").config();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL,
} = process.env;

const getToken = async () => {
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");

  const response = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data.access_token;
};

const lipaNaMpesaOnline = async (req, res) => {
  const token = await getToken();
  const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, "").slice(0, 14);
  const password = Buffer.from(MPESA_SHORTCODE + MPESA_PASSKEY + timestamp).toString("base64");

  const { amount, phone } = req.body;

  const requestBody = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: MPESA_CALLBACK_URL,
    AccountReference: "E-Constructor",
    TransactionDesc: "Tenant Payment",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      requestBody,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({ message: "M-Pesa request failed", error: error.message });
  }
};

module.exports = { lipaNaMpesaOnline };
