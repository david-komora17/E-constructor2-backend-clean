// backend/routes/smsRoutes.js

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

// ✅ Send general-purpose SMS (e.g. system alerts or custom text)
router.post("/", sendSMS);

// ✅ Send lease agreement link to tenant via SMS
router.post("/send-lease-link", sendLeaseLinkSMS);

// ✅ Fallback: Send lease agreement via email-to-SMS (if SMS fails)
router.post("/send-lease-link-email", sendLeaseLinkEmail);

// ✅ Test route — shows if MOCK_SMS mode is active
router.get("/test", (req, res) => {
  const mockEnabled = process.env.MOCK_SMS === "true";
  res.json({
    success: true,
    mode: mockEnabled ? "MOCK_SMS mode is ON (no real SMS sent)" : "Live SMS mode",
    timestamp: new Date(),
  });
});

module.exports = router;
