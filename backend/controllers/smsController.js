const africastalking = require("africastalking");
const nodemailer = require("nodemailer");

const at = africastalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

const sms = at.SMS;

// ✅ Controller: Send general SMS
exports.sendSMS = async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ success: false, error: "Missing 'to' or 'message'" });
  }

  try {
    const response = await sms.send({
      to: Array.isArray(to) ? to : [to],
      message,
    });

    res.status(200).json({
      success: true,
      message: "SMS sent successfully",
      data: response,
    });
  } catch (err) {
    console.error("❌ Africa's Talking SMS Error:", err);
    res.status(500).json({ success: false, error: "Failed to send SMS", details: err.message });
  }
};

// ✅ Controller: Send lease link via SMS
exports.sendLeaseLinkSMS = async (req, res) => {
  const { tenantPhone, leaseUrl } = req.body;

  if (!tenantPhone || !leaseUrl) {
    return res.status(400).json({ success: false, error: "Missing tenantPhone or leaseUrl" });
  }

  try {
    const response = await sms.send({
      to: [tenantPhone],
      message: `Dear tenant, access your lease agreement here: ${leaseUrl}`,
    });

    res.status(200).json({
      success: true,
      message: "Lease link sent via SMS",
      data: response,
    });
  } catch (err) {
    console.error("❌ SMS lease link error:", err);
    res.status(500).json({ success: false, error: "Failed to send lease link", details: err.message });
  }
};

// ✅ Controller: Send lease link via Email (optional fallback)
exports.sendLeaseLinkEmail = async (req, res) => {
  const { phone, leaseUrl } = req.body;

  if (!phone || !leaseUrl) {
    return res.status(400).json({ success: false, error: "Missing phone or leaseUrl" });
  }

  try {
    const mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ALERT_EMAIL,
        pass: process.env.ALERT_PASSWORD,
      },
    });

    await mailer.sendMail({
      from: process.env.ALERT_EMAIL,
      to: `${phone}@sms.gateway.com`, // NOTE: Replace with real SMS email gateway
      subject: "Lease Agreement Review",
      text: `Please review your lease: ${leaseUrl}`,
    });

    res.json({ success: true, message: "Lease link sent via email-SMS gateway" });
  } catch (err) {
    console.error("❌ Email-SMS lease link error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
