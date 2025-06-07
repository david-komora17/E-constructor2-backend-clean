// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const {
  changeOwnership,
  registerProperty,
  uploadPermit,
  generateQrCode,
  registerTenant,
  uploadLeaseAgreement,
  getAllProperties,
  getPropertyById,
  searchProperty
} = require('../controllers/propertyController');

const upload = require('../middleware/upload');

// Debug log to confirm this file is loaded
console.log("📦 propertyRoutes.js is loaded!");


// Middleware for handling file uploads
router.use(upload);

// Route: Change Ownership (✅ You asked for this)
router.post('/change-ownership', changeOwnership);

// Route: Register a new property
router.post('/register', registerProperty);

// Route: Upload a construction permit PDF
router.post('/upload-permit/:propertyId', uploadPermit);

// Route: Generate a QR code for a property
router.get('/generate-qr/:propertyId', generateQrCode);

// Route: Register a tenant
router.post('/register-tenant/:propertyId', registerTenant);

// Route: Upload lease agreement (PDF)
router.post('/upload-lease/:propertyId', uploadLeaseAgreement);

// Route: Get all properties
router.get('/', getAllProperties);

// Route: Get a property by its ID
router.get('/:id', getPropertyById);

// Route: Search property by LR number and county
router.get('/search', searchProperty);

module.exports = router;
