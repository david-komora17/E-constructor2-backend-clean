const Property = require('../models/Property');
const path = require('path');
const QRCode = require('qrcode');
console.log("🔧 Property controller loaded");

// Register Property
exports.registerProperty = async (req, res) => {
  try {
    const {
      postalAddress,
      lrNumber,
      ownerID,
      pin,
      phone,
      purpose,
      paybill,
      county // make sure county is included here if applicable
    } = req.body;

    let docs = [];
    if (req.files && req.files.documents) {
      let uploaded = req.files.documents;
      if (!Array.isArray(uploaded)) uploaded = [uploaded];

      for (const file of uploaded) {
        if (file.mimetype !== 'application/pdf') {
          return res.status(400).json({ error: 'Only PDF files are allowed for permits' });
        }

        const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'permits', file.name);
        await file.mv(uploadPath);
        docs.push(`/uploads/permits/${file.name}`);
      }
    }

    const property = new Property({
      postalAddress,
      lrNumber,
      ownerID,
      pin,
      phone,
      purpose,
      paybill,
      county, // added
      documents: docs
    });

    await property.save();
    res.status(201).json({ message: 'Property registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Upload Permit
exports.uploadPermit = async (req, res) => {
  try {
    if (!req.files || !req.files.permit) {
      return res.status(400).json({ error: 'No permit file uploaded' });
    }

    const permitFile = req.files.permit;

    if (permitFile.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are allowed for permits' });
    }

    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'permits', permitFile.name);
    await permitFile.mv(uploadPath);

    res.status(200).json({
      message: 'Permit uploaded successfully',
      filePath: `/uploads/permits/${permitFile.name}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Permit upload failed' });
  }
};

// Generate QR Code
exports.generateQrCode = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const link = `https:///details.html?id=${propertyId}`;
    const qrCodeDataURL = await QRCode.toDataURL(link);

    res.status(200).json({ qrCode: qrCodeDataURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'QR generation failed' });
  }
};

// Register Tenant (Stub)
exports.registerTenant = async (req, res) => {
  try {
    res.status(200).json({ message: 'Tenant registered (placeholder)' });
  } catch (err) {
    res.status(500).json({ error: 'Tenant registration failed' });
  }
};

// Upload Lease Agreement (Stub)
exports.uploadLeaseAgreement = async (req, res) => {
  try {
    res.status(200).json({ message: 'Lease agreement uploaded (placeholder)' });
  } catch (err) {
    res.status(500).json({ error: 'Lease agreement upload failed' });
  }
};

// Get All Properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// Get Property By ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

// ownership change
exports.changeOwnership = async (req, res) => {
  console.log("🧭 /change-ownership hit!");
  res.status(200).json({ message: "Mock changeOwnership working" });
};


// New: Search Property by LR and County
exports.searchProperty = async (req, res) => {
  const { lr, county } = req.query;

  if (!lr || !county) {
    return res.status(400).json({ message: "LR number and county are required" });
  }

  try {
    const property = await Property.findOne({ lrNumber: lr, county: county });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      property: {
        lrNumber: property.lrNumber,
        county: property.county,
        name: property.name || "Unnamed Property",
        status: property.status || "Pending",
        purpose: property.purpose || "Unknown",
        qrCodeUrl: property.qrCodeUrl || null
      }
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
