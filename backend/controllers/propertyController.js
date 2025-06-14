// backend/controllers/propertyController.js

const Property = require('../models/Property');

// ✅ Register Property — fully aligned with schema and file upload
const registerProperty = async (req, res) => {
  try {
    console.log("📩 Incoming property registration request");
    console.log("📄 req.body:", req.body);
    console.log("📎 req.file:", req.file);

    const {
      postalAddress,
      lrNumber,
      ownerID,
      purpose,
      paybill,
      floors
    } = req.body;

    if (!postalAddress || !lrNumber || !ownerID || !purpose || !paybill || !floors) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Handle file upload (permit certificate)
    const permitCertificate = req.file ? req.file.filename : "";

    // ✅ Construct new property object
    const newProperty = new Property({
      postalAddress,
      lrNumber,
      permitCertificate,
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
      propertyId: saved._id
    });

  } catch (error) {
    console.error("❌ Property registration error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Stubbed controller methods
const changeOwnership = async (req, res) => res.status(200).json({ message: "changeOwnership stub" });
const uploadPermit = async (req, res) => res.status(200).json({ message: "uploadPermit stub" });
const generateQrCode = async (req, res) => res.status(200).json({ message: "generateQrCode stub" });
const registerTenant = async (req, res) => res.status(200).json({ message: "registerTenant stub" });
const uploadLeaseAgreement = async (req, res) => res.status(200).json({ message: "uploadLeaseAgreement stub" });
const getAllProperties = async (req, res) => res.status(200).json({ message: "getAllProperties stub" });
const getPropertyById = async (req, res) => res.status(200).json({ message: "getPropertyById stub" });
const searchProperty = async (req, res) => res.status(200).json({ message: "searchProperty stub" });

// ✅ Export all functions
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
