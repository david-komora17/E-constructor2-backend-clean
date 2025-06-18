const Property = require('../models/Property');
const Tenant = require('../models/Tenant'); // Add if tenant logic exists
const path = require('path');
const fs = require('fs');

// ✅ Register Property — with file upload
const registerProperty = async (req, res) => {
  try {
    console.log("📩 Incoming property registration request");
    const { postalAddress, lrNumber, ownerID, purpose, paybill, floors } = req.body;

    if (!postalAddress || !lrNumber || !ownerID || !purpose || !paybill || !floors) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const permitCertificate = req.file ? req.file.filename : "";

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

    res.status(201).json({
      message: "Property registered successfully",
      propertyId: saved._id
    });

  } catch (error) {
    console.error("❌ Property registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Change Ownership

const changeOwnership = async (req, res) => {
  const { propertyId, newOwnerID } = req.body;

  if (!propertyId || !newOwnerID) {
    return res.status(400).json({ message: "Missing property ID or new owner ID" });
  }

  try {
    const updated = await Property.findByIdAndUpdate(
      propertyId,
      { ownerName: newOwnerID },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Ownership updated successfully",
      updatedProperty: updated,
    });
  } catch (err) {
    console.error("Ownership update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Upload Permit Certificate
const uploadPermit = async (req, res) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId || !req.file) {
      return res.status(400).json({ message: "Missing property ID or permit file" });
    }

    const updated = await Property.findByIdAndUpdate(
      propertyId,
      { permitCertificate: req.file.filename },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Permit uploaded successfully", property: updated });
  } catch (err) {
    console.error("❌ Permit upload error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Generate QR Code (placeholder URL for now)
const generateQrCode = async (req, res) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId) return res.status(400).json({ message: "Missing property ID" });

    const fakeQrUrl = `https://e-constructor.com/details.html?id=${propertyId}`;
    const updated = await Property.findByIdAndUpdate(propertyId, { qrCodeUrl: fakeQrUrl }, { new: true });

    res.status(200).json({ message: "QR Code generated", qrCodeUrl: fakeQrUrl });
  } catch (err) {
    res.status(500).json({ message: "Error generating QR code", error: err.message });
  }
};

// ✅ Register Tenant
const registerTenant = async (req, res) => {
  try {
    const { name, phone, propertyId } = req.body;

    if (!name || !phone || !propertyId) {
      return res.status(400).json({ message: "Missing tenant name, phone, or propertyId" });
    }

    const tenant = new Tenant({ name, phone, propertyId });
    const saved = await tenant.save();

    res.status(201).json({ message: "Tenant registered", tenant: saved });
  } catch (err) {
    res.status(500).json({ message: "Error registering tenant", error: err.message });
  }
};

// ✅ Upload Lease Agreement
const uploadLeaseAgreement = async (req, res) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId || !req.file) {
      return res.status(400).json({ message: "Missing property ID or lease agreement file" });
    }

    const [postalAddress, lrNumber] = propertyId.split("|");
    const property = await Property.findOne({ postalAddress, lrNumber });
    if (!property) return res.status(404).json({ message: "Property not found" });

    property.leasingAgreement = req.file.filename;
    await property.save();

    res.status(200).json({ message: "Lease agreement uploaded", property });
  } catch (err) {
    res.status(500).json({ message: "Error uploading lease", error: err.message });
  }
};



// ✅ Get All Properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ properties });
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties", error: err.message });
  }
};

// ✅ Get Property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: "Error fetching property", error: err.message });
  }
};

// ✅ Search Property by LR number + Postal Address (for ownership transfer)
const searchProperty = async (req, res) => {
  try {
    const { postalAddress, lrNumber } = req.query;

    if (!postalAddress || !lrNumber) {
      return res.status(400).json({ message: "Missing postal address or LR number" });
    }

    const property = await Property.findOne({ postalAddress, lrNumber });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ propertyId: property._id });
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

// ✅ Export all
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
