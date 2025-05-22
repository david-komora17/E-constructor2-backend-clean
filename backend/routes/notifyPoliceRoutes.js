// backend/routes/notifyPoliceRoutes.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/notify-police", async (req, res) => {
  console.log("📥 Incoming request body:", req.body);

  const { message, address } = req.body;

  if (!message || !address) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: 'message' and 'address'",
    });
  }

  try {
    // Check if environment variables are loaded correctly
    if (!process.env.ALERT_EMAIL || !process.env.ALERT_PASSWORD) {
      throw new Error("❌ ALERT_EMAIL or ALERT_PASSWORD is not set in .env");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ALERT_EMAIL,
        pass: process.env.ALERT_PASSWORD,
      },
    });

    // Verify the connection before sending
    await transporter.verify();

    const mailOptions = {
      from: process.env.ALERT_EMAIL,
      to: "nearestpolice@station.go.ke", // Replace with a valid test email during testing
      subject: "Illegal Occupation Notice",
      text: `📍 Address: ${address}\n\n📝 Message: ${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.response);

    res.status(200).json({
      success: true,
      message: "Notification sent to the police successfully.",
    });
  } catch (err) {
    console.error("❌ FULL ERROR:", err);

    res.status(500).json({
      success: false,
      error: "Failed to send police notification.",
      details: err.message, // Expose details for debugging only
    });
  }
});

module.exports = router;
