const express = require("express");
const router = express.Router();
const {
  sendSMS,
  sendLeaseLinkSMS,
  sendLeaseLinkEmail,
} = require("../controllers/smsController");

// ================================
// 🔹 SMS ROUTES FOR E-CONSTRUCTOR
// ================================

// ✅ Send general-purpose SMS (e.g. custom message)
router.post("/", sendSMS);

// ✅ Send lease agreement link to tenant via SMS
router.post("/send-lease-link", sendLeaseLinkSMS);

// ✅ Fallback: Send lease link using email-to-SMS gateway
router.post("/send-lease-link-email", sendLeaseLinkEmail);

// ✅ GET /api/sms/test — returns MOCK_SMS mode status
router.get("/test", (req, res) => {
  const mockEnabled = process.env.MOCK_SMS === "true";
  res.json({
    success: true,
    mode: mockEnabled ? "MOCK_SMS mode is ON (no real SMS sent)" : "Live SMS mode",
    timestamp: new Date(),
  });
});

module.exports = router;
