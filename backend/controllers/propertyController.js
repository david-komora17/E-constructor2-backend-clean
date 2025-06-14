// backend/controllers/propertyController.js

const Property = require('../models/Property');
const path = require('path');

// ✅ Register Property — now saves uploaded permit file path
const registerProperty = async (req, res) => {
  try {
    console.log("📩 Form data:", req.body);
    console.log("📎 Uploaded file:", req.file); // multer puts the single file in req.file

    const {
      postalAddress,
      lrNumber,
      ownerID,
      purpose,
      paybill,
      floors
    } = req.body;

    // Validate required fields
    if (!postalAddress || !lrNumber || !ownerID || !purpose || !paybill || !floors) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Handle uploaded permit file
    const permitPath = req.file ? `/uploads/${req.file.filename}` : "";

    // Create new Property document
    const newProperty = new Property({
      postalAddress,
      lrNumber,
      permitCertificate: permitPath,
      ownerName: ownerID,
      projectUse: purpose,
      unitDetails: `${floors} floors`,
      mpesaInfo: paybill,
      bankInfo: "",
      occupancyCertificate: "",
      leasingAgreement: "",
      qrCodeUrl: ""
    });

    const saved = await newProperty.save();

    return res.status(201).json({
      message: "Property registered successfully",
      property: {
        _id: saved._id,
        __v: saved.__v
      }
    });

  } catch (error) {
    console.error("❌ Property registration error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Placeholder stubs
const changeOwnership = async (req, res) => {
  res.status(200).json({ message: "changeOwnership stub" });
};

const uploadPermit = async (req, res) => {
  res.status(200).json({ message: "uploadPermit stub" });
};

const generateQrCode = async (req, res) => {
  res.status(200).json({ message: "generateQrCode stub" });
};

const registerTenant = async (req, res) => {
  res.status(200).json({ message: "registerTenant stub" });
};

const uploadLeaseAgreement = async (req, res) => {
  res.status(200).json({ message: "uploadLeaseAgreement stub" });
};

const getAllProperties = async (req, res) => {
  res.status(200).json({ message: "getAllProperties stub" });
};

const getPropertyById = async (req, res) => {
  res.status(200).json({ message: "getPropertyById stub" });
};

const searchProperty = async (req, res) => {
  res.status(200).json({ message: "searchProperty stub" });
};

// Export all controllers
module.exports = {
  registerProperty,
  changeOwnership,
  uploadPermit,
  generateQrCode,
  registerTenant,
  uploadLeaseAgreement,
  getAllProperties,
  getPropertyById,
  searchProperty
};
