// backend/controllers/notifyPoliceController.js

const nodemailer = require("nodemailer");

exports.notifyPolice = async (req, res) => {
  const { message, address } = req.body;

  console.log("📥 Incoming police alert:", req.body);

  if (!message || !address) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: 'message' and 'address'",
    });
  }

  try {
    const { ALERT_EMAIL, ALERT_PASSWORD } = process.env;

    if (!ALERT_EMAIL || !ALERT_PASSWORD) {
      throw new Error("❌ ALERT_EMAIL or ALERT_PASSWORD is not set in .env");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ALERT_EMAIL,
        pass: ALERT_PASSWORD,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: ALERT_EMAIL,
      to: "nearestpolice@station.go.ke", // Replace with test email in dev
      subject: "🚨 Illegal Occupation Alert",
      text: `📍 Address: ${address}\n\n📝 Message: ${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result.response);

    res.status(200).json({
      success: true,
      message: "Notification sent to the police successfully.",
    });
  } catch (err) {
    console.error("❌ Failed to notify police:", err);

    res.status(500).json({
      success: false,
      error: "Failed to send police notification.",
      details: err.message,
    });
  }
};
