const nodemailer = require("nodemailer");

exports.notifyPolice = async (req, res) => {
  const { message, address } = req.body;

  if (!message || !address) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: 'message' and 'address'",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ALERT_EMAIL,
        pass: process.env.ALERT_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.ALERT_EMAIL,
      to: "nearestpolice@station.go.ke", // Replace with actual police email in production
      subject: "Illegal Occupation Notice",
      text: `Address: ${address}\n\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Notification sent to the police successfully.",
    });
  } catch (err) {
    console.error("❌ Notify Police Error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to send police notification.",
    });
  }
};
