 // backend/routes/smsRoutes.js
const express = require("express");
const router = express.Router();
const africastalking = require("africastalking");

const at = africastalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

const sms = at.SMS;

// @route   POST /api/send-sms
// @desc    Send SMS using Africa's Talking
// @access  Public or Protected (Optional: Add middleware)
router.post("/", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ success: false, error: "Missing 'to' or 'message' fields." });
  }

  try {
    const response = await sms.send({
      to: Array.isArray(to) ? to : [to],
      message, 
    });

    res.status(200).json({
      success: true,
      message: "SMS sent successfully",
      data: response
    });
  } catch (err) {
  console.error("❌ Africa's Talking SMS Error:", err);
  if (err.response) {
    console.error("Response data:", err.response.data);
    console.error("Response status:", err.response.status);
  }
  res.status(500).json({ success: false, error: "Failed to send SMS.", details: err.message });
}

});

module.exports = router;

 
