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

// Debug log
console.log("📦 propertyRoutes.js is loaded!");

// Middleware for handling file uploads
router.use(upload);

// 🔄 ORDER MATTERS — more specific routes FIRST
router.post('/change-ownership', changeOwnership);
router.post('/register', registerProperty);
router.post('/upload-permit/:propertyId', uploadPermit);
router.get('/generate-qr/:propertyId', generateQrCode);
router.post('/register-tenant/:propertyId', registerTenant);
router.post('/upload-lease/:propertyId', uploadLeaseAgreement);
router.get('/search', searchProperty); // ✅ Move this above :id
router.get('/', getAllProperties);
router.get('/:id', getPropertyById); // ❗ This must be LAST

module.exports = router;
