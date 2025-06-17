// backend/routes/propertyRoutes.js
const multer = require('multer');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/propertyController');

// === ✅ Configure multer ===
// Use diskStorage to store files in /uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
 // You must create this folder or ensure it's writable
  },
  filename: function (req, file, cb) {
    // Save with original name + timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.originalname;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// === ✅ Import controller functions ===
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

// === ✅ Validate handlers ===
function validateHandler(handler, name) {
  if (typeof handler !== 'function') {
    throw new Error(`❌ Missing or invalid controller function: ${name}`);
  }
}

[
  ['registerProperty', registerProperty],
  ['changeOwnership', changeOwnership],
  ['uploadPermit', uploadPermit],
  ['generateQrCode', generateQrCode],
  ['registerTenant', registerTenant],
  ['uploadLeaseAgreement', uploadLeaseAgreement],
  ['getAllProperties', getAllProperties],
  ['getPropertyById', getPropertyById],
  ['searchProperty', searchProperty],
].forEach(([name, fn]) => validateHandler(fn, name));

// === ✅ Define Routes ===

// POST /api/property — Register property
router.post('/', upload.single('documents'), registerProperty);

// GET /api/property/search?lrNumber=...&county=...
router.get('/search', searchProperty);

// POST /api/property/change-ownership
router.post('/change-ownership', changeOwnership);

// POST /api/property/upload-permit
router.post('/upload-permit', uploadPermit);

// GET /api/property/generate-qr/:id
router.get('/generate-qr/:id', generateQrCode);

// POST /api/property/register-tenant
router.post('/register-tenant', registerTenant);

// ✅ ✅ POST /api/property/upload-lease — FIXED with multer middleware
router.post('/upload-lease', upload.single('leaseAgreement'), uploadLeaseAgreement);

// GET /api/property
router.get('/', getAllProperties);

// GET /api/property/:id
router.get('/:id', getPropertyById);

module.exports = router;
