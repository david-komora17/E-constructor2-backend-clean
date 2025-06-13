const Property = require('../models/Property');

// ✅ Register Property
const registerProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      owner,
      status,
      floorCount
    } = req.body;

    if (!title || !location || !owner) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProperty = new Property({
      title,
      location,
      owner,
      status,
      floorCount
    });

    const saved = await newProperty.save();
    res.status(201).json({ message: "Property registered successfully", property: saved });

  } catch (error) {
    console.error("❌ Error in registerProperty:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟡 Safe placeholder functions (replace with your logic)
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

// ✅ Export all controller functions
module.exports = {
  registerProperty,
  changeOwnership,
  uploadPermit,
  generateQrCode,
  registerTenant,
  uploadLeaseAgreement,
  getAllProperties,
  getPropertyById,
  searchProperty,
};
