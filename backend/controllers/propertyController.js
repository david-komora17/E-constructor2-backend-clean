const Property = require('../models/Property');

// ✅ Register Property
const registerProperty = async (req, res) => {
  try {
    console.log("📩 Incoming FormData:", req.body);

    const title = req.body.postalAddress;
    const location = req.body.lrNumber;
    const owner = req.body.ownerID;
    const status = req.body.purpose;
    const floorCount = req.body.floors;

    if (!title || !location || !owner) {
      console.log("❌ Missing required fields:", { title, location, owner });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProperty = new Property({
      title,
      location,
      owner,
      status,
      floorCount,
    });

    const saved = await newProperty.save();
    console.log("✅ Property saved:", saved);

    return res.status(201).json({
      message: "Property registered successfully",
      property: {
        _id: saved._id,
        __v: saved.__v
      }
    });
  } catch (error) {
    console.error("❌ Server error during registration:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
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
