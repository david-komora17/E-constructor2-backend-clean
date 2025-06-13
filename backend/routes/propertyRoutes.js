// backend/routes/propertyRoutes.js
const multer = require('multer');
const storage = multer.memoryStorage(); // Or diskStorage if saving files
const upload = multer({ storage });

const express = require('express');
const router = express.Router();
const controller = require('../controllers/propertyController');

// Destructure and validate required functions from the controller
const {
  registerProperty,
  changeOwnership,
  uploadPermit,
  generateQrCode,
  registerTenant,
  uploadLeaseAgreement,
  getAllProperties,
  getPropertyById,
  searchProperty,
} = controller;

// Helper to ensure all required handlers are defined
function validateHandler(handler, name) {
  if (typeof handler !== 'function') {
    throw new Error(`❌ Missing or invalid controller function: ${name}`);
  }
}

// Validate all routes before registering them
validateHandler(registerProperty, 'registerProperty');
validateHandler(changeOwnership, 'changeOwnership');
validateHandler(uploadPermit, 'uploadPermit');
validateHandler(generateQrCode, 'generateQrCode');
validateHandler(registerTenant, 'registerTenant');
validateHandler(uploadLeaseAgreement, 'uploadLeaseAgreement');
validateHandler(getAllProperties, 'getAllProperties');
validateHandler(getPropertyById, 'getPropertyById');
validateHandler(searchProperty, 'searchProperty');

// ✅ Register property via POST /api/property
router.post('/', upload.array('documents'), registerProperty);


// 📌 Search property by LR number and County
router.get('/search', searchProperty);

// 📌 Change ownership of a property
router.post('/change-ownership', changeOwnership);

// 📌 Upload building permit document
router.post('/upload-permit', uploadPermit);

// 📌 Generate QR code for a registered property
router.get('/generate-qr/:id', generateQrCode);

// 📌 Register a new tenant for a property
router.post('/register-tenant', registerTenant);

// 📌 Upload lease agreement document
router.post('/upload-lease', uploadLeaseAgreement);

// 📌 Get all registered properties
router.get('/', getAllProperties);

// 📌 Get property details by ID
router.get('/:id', getPropertyById);

module.exports = router;
