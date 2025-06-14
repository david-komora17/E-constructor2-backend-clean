// backend/routes/propertyRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// ✅ Save files to disk in a public/uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../public/uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

const controller = require('../controllers/propertyController');
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

// ✅ File upload with metadata
router.post('/', upload.single('documents'), registerProperty);

// 📌 Additional endpoints
router.get('/search', searchProperty);
router.post('/change-ownership', changeOwnership);
router.post('/upload-permit', uploadPermit);
router.get('/generate-qr/:id', generateQrCode);
router.post('/register-tenant', registerTenant);
router.post('/upload-lease', uploadLeaseAgreement);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

module.exports = router;
