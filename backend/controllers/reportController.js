// backend/controllers/reportController.js
const Property = require('../models/Property');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// 🟢 Multer setup to store evidence images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage }).single('evidence');

// 🟥 POST /api/report
const submitReport = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(400).json({ message: 'Upload failed', error: err.message });

    const { buildingId, issueDescription } = req.body;
    const photoFilename = req.file?.filename;

    if (!buildingId || !issueDescription || !photoFilename) {
      return res.status(400).json({ message: 'Missing fields or photo evidence' });
    }

    try {
      const property = await Property.findOne({ lrNumber: buildingId });
      if (!property) return res.status(404).json({ message: 'Building not found' });

      const landlordId = property.ownerName;

      // Log the report
      console.log('📸 Report submitted:', {
        buildingId,
        issueDescription,
        photo: photoFilename,
        landlordId
      });

      res.status(200).json({ message: 'Report submitted', landlordId });
    } catch (err) {
      console.error('❌ Report error:', err);
      res.status(500).json({ message: 'Report failed', error: err.message });
    }
  });
};

module.exports = { submitReport };
