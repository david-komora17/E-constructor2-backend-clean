const Property = require('../models/Property');
const path = require('path');
const fs = require('fs');

exports.registerProperty = async (req, res) => {
  try {
    const {
      postalAddress,
      lrNumber,
      ownerID,
      pin,
      phone,
      purpose,
      paybill
    } = req.body;

    let docs = [];
    if (req.files && req.files.documents) {
      let uploaded = req.files.documents;
      if (!Array.isArray(uploaded)) uploaded = [uploaded];
      uploaded.forEach(file => {
        const filePath = path.join(__dirname, '..', '..', 'uploads', file.name);
        file.mv(filePath);
        docs.push(`/uploads/${file.name}`);
      });
    }

    const property = new Property({
      postalAddress,
      lrNumber,
      ownerID,
      pin,
      phone,
      purpose,
      paybill,
      documents: docs
    });

    await property.save();
    res.status(201).json({ message: 'Property registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
