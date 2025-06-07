const Property = require('../models/Property');
const Tenant = require('../models/Tenant');
const generateQRCode = require('../utils/qrGenerator'); // Assuming this exists
const path = require('path');
const fs = require('fs');

// Debug log
console.log("✅ Property controller loaded");

// ✅ Change Ownership
exports.changeOwnership = async (req, res) => {
  try {
    console.log("🧭 /change-ownership hit!");

    const { propertyId, newOwnerName, newOwnerContact, newOwnerIDNumber } = req.body;

    if (!propertyId || !newOwnerName || !newOwnerContact || !newOwnerIDNumber) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.owner.name = newOwnerName;
    property.owner.contact = newOwnerContact;
    property.owner.idNumber = newOwnerIDNumber;

    await property.save();

    res.status(200).json({
      message: 'Ownership updated successfully',
      property,
    });
  } catch (error) {
    console.error("❌ Error in changeOwnership:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Register Property
exports.registerProperty = async (req, res) => {
  // Implement this function as needed
  res.json({ message: 'registerProperty placeholder' });
};

// ✅ Upload Permit
exports.uploadPermit = async (req, res) => {
  // Implement this function as needed
  res.json({ message: 'uploadPermit placeholder' });
};

// ✅ Generate QR Code
exports.generateQrCode = async (req, res) => {
  // Implement this function as needed
  res.json({ message: 'generateQrCode placeholder' });
};

// ✅ Register Tenant
exports.registerTenant = async (req, res) => {
  // Implement this function as needed
  res.json({ message: 'registerTenant placeholder' });
};

// ✅ Upload Lease Agreement
exports.uploadLeaseAgreement = async (req, res) => {
  // Implement this function as needed
  res.json({ message: 'uploadLeaseAgreement placeholder' });
};

// ✅ Get All Properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get Property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Search by LR number and county
exports.searchProperty = async (req, res) => {
  const { lrNumber, county } = req.query;

  try {
    const query = {};
    if (lrNumber) query['location.lrNumber'] = lrNumber;
    if (county) query['location.county'] = county;

    const properties = await Property.find(query);
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};
