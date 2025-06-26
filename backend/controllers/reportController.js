const Property = require('../models/Property');

const submitReport = async (req, res) => {
  try {
    const { buildingId, issueDescription } = req.body;
    const photoFilename = req.file?.filename;

    if (!buildingId || !issueDescription || !photoFilename) {
      return res.status(400).json({ message: 'Missing fields or photo evidence' });
    }

    // 🔧 Normalize LR number before searching
    const normalizedLR = buildingId.trim();

    const property = await Property.findOne({ lrNumber: normalizedLR });
    if (!property) return res.status(404).json({ message: 'Building not found' });

    const landlordId = property.ownerName;

    console.log('📸 Report submitted:', {
      buildingId: normalizedLR,
      issueDescription,
      photo: photoFilename,
      landlordId
    });

    res.status(200).json({ message: 'Report submitted', landlordId });
  } catch (err) {
    console.error('❌ Report error:', err);
    res.status(500).json({ message: 'Report failed', error: err.message });
  }
};

module.exports = { submitReport };
