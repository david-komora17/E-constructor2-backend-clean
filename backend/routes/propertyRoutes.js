const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const controller = require('../controllers/propertyController');

// === ✅ Ensure uploads directory exists ===
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// === ✅ Configure multer to store in disk ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
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
  submitManagerCredentials, // ✅ NEW controller added here
  terminateManager,
} = controller;

// === ✅ Validate handlers ===
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
  ['terminateManager', terminateManager], // ✅ Add this to the validation list
  ['submitManagerCredentials', submitManagerCredentials], // ✅ Validate new handler
].forEach(([name, fn]) => {
  if (typeof fn !== 'function') {
    throw new Error(`❌ Missing or invalid controller function: ${name}`);
  }
});

// === ✅ Define Routes ===

// POST /api/property — Register property
router.post('/', upload.single('documents'), registerProperty);

// GET /api/property/search?lrNumber=...&county=...
router.get('/search', searchProperty);

// POST /api/property/change-ownership
router.post('/change-ownership', changeOwnership);

// POST /api/property/upload-permit
router.post('/upload-permit', upload.single('permitCertificate'), uploadPermit);

// GET /api/property/generate-qr/:id
router.get('/generate-qr/:id', generateQrCode);

// POST /api/property/register-tenant
router.post('/register-tenant', registerTenant);

// ✅ POST /api/property/upload-lease
router.post('/upload-lease', upload.single('leaseAgreement'), uploadLeaseAgreement);

// ✅ POST /api/property/submit-manager — NEW route
router.post('/submit-manager', upload.single('permit-upload'), submitManagerCredentials);

// ✅ POST /api/property/terminate-manager — NEW route
router.post('/terminate-manager', controller.terminateManager);

// GET /api/property
router.get('/', getAllProperties);

// GET /api/property/:id
router.get('/:id', getPropertyById);

module.exports = router;
