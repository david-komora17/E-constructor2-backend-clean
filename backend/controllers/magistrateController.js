// backend/controllers/magistrateController.js

const axios = require('axios');
const { sendSMS } = require('../utils/sms'); // Utility for sending SMS

/**
 * POST /api/magistrates/verify-external
 * Verifies a magistrate via external system and sends them an SMS code if verified.
 */
exports.verifyMagistrateExternally = async (req, res) => {
  const { name, phone, ID, court } = req.body;

  if (!name || !phone || !ID || !court) {
    return res.status(400).json({ message: 'All fields are required: name, phone, ID, court' });
  }

  try {
    // ⚠️ Replace this with a real API in production
    const response = await axios.post('https://magistrates.gov.ke/api/verify', {
      name,
      phone,
      ID,
      court
    });

    if (response.data.verified) {
      // Generate a random 6-digit approval code
      const code = Math.floor(100000 + Math.random() * 900000);

      // Send SMS with approval code
      await sendSMS(phone, `Your approval code is ${code}`);

      return res.status(200).json({
        message: 'Magistrate verified. SMS sent.',
        code
      });
    } else {
      return res.status(401).json({ message: 'Magistrate not verified.' });
    }
  } catch (error) {
    console.error('❌ Error verifying magistrate:', error.message);
    return res.status(500).json({ message: 'Verification service error.' });
  }
};
