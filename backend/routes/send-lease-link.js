const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send-lease-link", async (req, res) => {
  const { phone, leaseUrl } = req.body;

  try {
    const mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ALERT_EMAIL,
        pass: process.env.ALERT_PASSWORD
      }
    });

    await mailer.sendMail({
      from: process.env.ALERT_EMAIL,
      to: `${phone}@sms.gateway.com`, // Change this if using real SMS API
      subject: "Lease Agreement Review",
      text: `Please review your lease: ${leaseUrl}`
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
