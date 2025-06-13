const express = require("express");
const router = express.Router();
const {
  sendSMS,
  sendLeaseLinkSMS,
  sendLeaseLinkEmail,
} = require("../controllers/smsController");

// ✅ General SMS sender (Africa's Talking)
router.post("/", sendSMS);

// ✅ Send lease link via SMS (to tenantPhone)
router.post("/send-lease-link", sendLeaseLinkSMS);

// ✅ Send lease link via Email-to-SMS fallback
router.post("/send-lease-link-email", sendLeaseLinkEmail);

module.exports = router;
