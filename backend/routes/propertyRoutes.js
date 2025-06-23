const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const controller = require('../controllers/propertyController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for storing files on disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Destructure controller functions
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
  submitManagerCredentials,
  terminateManager,
  evictTenant // ✅ Add this
} = controller;

// Validation for missing functions
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
  ['submitManagerCredentials', submitManagerCredentials],
  ['terminateManager', terminateManager],
  ['evictTenant', evictTenant] // ✅ Validate
].forEach(([name, fn]) => {
  if (typeof fn !== 'function') {
    throw new Error(`❌ Missing or invalid controller function: ${name}`);
  }
});

// Routes
router.post('/', upload.single('documents'), registerProperty);
router.post('/change-ownership', changeOwnership);
router.post('/upload-permit', upload.single('permitCertificate'), uploadPermit);
router.post('/upload-lease', upload.single('leaseAgreement'), uploadLeaseAgreement);
router.post('/submit-manager', upload.single('permit-upload'), submitManagerCredentials);
router.post('/terminate-manager', terminateManager);
router.post('/register-tenant', registerTenant);
router.post('/evict-tenant', evictTenant); // ✅ Add this route

router.get('/', getAllProperties);
router.get('/search', searchProperty);
router.get('/generate-qr/:id', generateQrCode);
router.get('/:id', getPropertyById);

module.exports = router;
