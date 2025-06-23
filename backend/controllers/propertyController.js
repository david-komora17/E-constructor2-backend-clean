const Property = require('../models/Property');
const Tenant = require('../models/Tenant');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

// ✅ Register Property
const registerProperty = async (req, res) => {
  try {
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
  } catch (err) {
    console.error("❌ Property registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
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
    if (!updated) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Ownership updated", updatedProperty: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Upload Permit
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
    if (!updated) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "Permit uploaded", property: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Generate QR Code Image & URL
const generateQrCode = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const qrText = `https://e-constructor2.netlify.app/details.html?id=${propertyId}`;
    const filePath = path.join(__dirname, `../public/uploads/qr-${propertyId}.png`);

    await QRCode.toFile(filePath, qrText);

    const qrImageUrl = `https://e-constructor2-backend-clean.onrender.com/uploads/qr-${propertyId}.png`;

    const updated = await Property.findByIdAndUpdate(propertyId, {
      qrCodeUrl: qrImageUrl
    }, { new: true });

    if (!updated) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "QR Code generated", qrCodeUrl });
  } catch (err) {
    res.status(500).json({ message: "QR generation failed", error: err.message });
  }
};

// ✅ Register Tenant
const registerTenant = async (req, res) => {
  try {
    const { name, phone, propertyId } = req.body;
    if (!name || !phone || !propertyId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const tenant = new Tenant({ name, phone, propertyId });
    const saved = await tenant.save();

    res.status(201).json({ message: "Tenant registered", tenant: saved });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Upload Lease Agreement
const uploadLeaseAgreement = async (req, res) => {
  try {
    const { propertyId } = req.body;
    if (!propertyId || !req.file) {
      return res.status(400).json({ message: "Missing property ID or lease file" });
    }

    const [postalAddress, lrNumber] = propertyId.split("|");
    const property = await Property.findOne({ postalAddress, lrNumber });
    if (!property) return res.status(404).json({ message: "Property not found" });

    property.leasingAgreement = req.file.filename;
    await property.save();

    res.status(200).json({ message: "Lease uploaded", property });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get All Properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ properties });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get Property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Search Property by Postal + LR
const searchProperty = async (req, res) => {
  try {
    const { postalAddress, lrNumber } = req.query;
    if (!postalAddress || !lrNumber) {
      return res.status(400).json({ message: "Missing search parameters" });
    }

    const property = await Property.findOne({ postalAddress, lrNumber });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ propertyId: property._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Terminate Manager
const terminateManager = async (req, res) => {
  try {
    const { managerName, licenseNumber, terminationReason } = req.body;
    if (!managerName || !licenseNumber || !terminationReason) {
      return res.status(400).json({ message: "Missing fields" });
    }

    console.log(`🔴 Termination requested for: ${managerName} (${licenseNumber}) - Reason: ${terminationReason}`);
    res.status(200).json({ message: "Manager termination submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Submit Manager Credentials
const submitManagerCredentials = async (req, res) => {
  try {
    const { 'manager-name': managerName, 'manager-id': managerId, 'lr-number': lrNumber } = req.body;
    const permitFile = req.file?.filename;

    if (!managerName || !managerId || !lrNumber || !permitFile) {
      return res.status(400).json({ message: "Missing fields" });
    }

    console.log("✅ Manager submitted:", {
      managerName,
      managerId,
      lrNumber,
      permitFile
    });

    res.status(200).json({ message: "Manager credentials submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Evict Tenant Handler
const evictTenant = async (req, res) => {
  try {
    const { tenantId, address, charges, magistrate, jscId, dueDate } = req.body;

    if (!tenantId || !address || !charges || !magistrate || !jscId || !dueDate) {
      return res.status(400).json({ message: "Missing required eviction details" });
    }

    console.log(`🚨 Eviction Request:
    Tenant: ${tenantId}
    Address: ${address}
    Charges: ${charges}
    Magistrate: ${magistrate}
    JSC ID: ${jscId}
    Due Date: ${dueDate}`);

    res.status(200).json({ message: "Eviction request received." });
  } catch (err) {
    console.error("❌ Eviction error:", err.message);
    res.status(500).json({ message: "Eviction server error", error: err.message });
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
  searchProperty,
  submitManagerCredentials,
  terminateManager,
  evictTenant
};
