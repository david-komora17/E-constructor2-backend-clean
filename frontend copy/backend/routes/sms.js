// routes/sms.js
const express = require("express");
const router = express.Router();
const africastalking = require("africastalking");

// Initialize Africa's Talking with credentials from .env
const at = africastalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = at.SMS;

// POST /api/send-sms
router.post("/", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ success: false, error: "Missing 'to' or 'message'" });
  }

  try {
    const result = await sms.send({
      to: [to],
      message,
      from: "E-Constructor" // Optional sender ID, must be approved in live mode
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("❌ SMS send error:", error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

module.exports = router;
