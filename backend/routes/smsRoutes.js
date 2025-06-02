const express = require("express");
const router = express.Router();
const africastalking = require("africastalking");

const at = africastalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

const sms = at.SMS;

// ✅ General SMS endpoint
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
    res.status(500).json({ success: false, error: "Failed to send SMS.", details: err.message });
  }
});

// ✅ Lease link SMS endpoint
router.post("/send-lease-link", async (req, res) => {
  const { tenantPhone, leaseUrl } = req.body;

  if (!tenantPhone || !leaseUrl) {
    return res.status(400).json({ success: false, error: "Missing tenantPhone or leaseUrl." });
  }

  try {
    const response = await sms.send({
      to: [tenantPhone],
      message: `Dear tenant, access your lease agreement here: ${leaseUrl}`,
    });

    res.status(200).json({
      success: true,
      message: "Lease link sent successfully",
      data: response
    });
  } catch (err) {
    console.error("❌ Failed to send lease link SMS:", err);
    res.status(500).json({ success: false, error: "Failed to send lease link.", details: err.message });
  }
});

module.exports = router;
