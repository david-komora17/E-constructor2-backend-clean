// controllers/magistrateController.js
const axios = require('axios');
const { sendSMS } = require('../utils/sms'); // You already use this in smsRoutes.js

exports.verifyMagistrateExternally = async (req, res) => {
  const { name, phone, ID, court } = req.body;

  try {
    // This should later become a real API call to an official system
    const response = await axios.post('https://magistrates.gov.ke/api/verify', {
      name,
      phone,
      ID,
      court
    });

    if (response.data.verified) {
      const code = Math.floor(100000 + Math.random() * 900000);
      await sendSMS(phone, `Your approval code is ${code}`);

      res.status(200).json({ message: 'Magistrate verified. SMS sent.', code });
    } else {
      res.status(401).json({ message: 'Magistrate not verified.' });
    }
  } catch (error) {
    console.error('Error verifying magistrate:', error.message);
    res.status(500).json({ message: 'Verification service error.' });
  }
};
