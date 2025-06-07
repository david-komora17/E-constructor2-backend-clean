// backend/utils/qrGenerator.js

const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const generateQRCodeImage = async (propertyId) => {
  try {
    const qrData = `https://your-frontend-url.com/details.html?id=${propertyId}`;
    const qrDir = path.join(__dirname, '..', 'public', 'uploads', 'qrcodes');

    // Create directory if it doesn't exist
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    const qrPath = path.join(qrDir, `${propertyId}.png`);
    await QRCode.toFile(qrPath, qrData);

    return `/uploads/qrcodes/${propertyId}.png`; // relative path for front-end use
  } catch (error) {
    throw new Error('QR code generation failed: ' + error.message);
  }
};

module.exports = generateQRCodeImage;
