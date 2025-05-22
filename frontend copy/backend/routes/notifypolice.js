const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer"); // Or use SMS provider

router.post("/notify-police", async (req, res) => {
  const { message, address } = req.body;

  try {
    // Example: Send via email (or integrate SMS API like Twilio/Africa's Talking)
    const mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ALERT_EMAIL,
        pass: process.env.ALERT_PASSWORD
      }
    });

    await mailer.sendMail({
      from: process.env.ALERT_EMAIL,
      to: "nearestpolice@station.go.ke", // Replace with actual recipient
      subject: "Illegal Occupation Notice",
      text: message
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
