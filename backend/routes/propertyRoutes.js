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
  searchProperty,  // added here
} = require('../controllers/propertyController');

const upload = require('../middleware/upload'); // express-fileupload middleware

// Enable file upload globally using express-fileupload middleware
router.use(upload);

// Register property (documents field – array of PDFs)
router.post('/register', registerProperty);

// Upload permit separately (field should be 'permit' as per controller)
router.post('/upload-permit/:propertyId', uploadPermit);

// Generate QR code
router.get('/generate-qr/:propertyId', generateQrCode);

// ownership change form
router.post('/change-ownership', changeOwnership);

// Register tenant (assuming tenant details in req.body)
router.post('/register-tenant/:propertyId', registerTenant);

// Upload lease agreement (field: leaseAgreement)
router.post('/upload-lease/:propertyId', uploadLeaseAgreement);

// Get all properties
router.get('/', getAllProperties);

// Get property by ID
router.get('/:id', getPropertyById);

// New: Search property by lr and county (query params)
router.get('/search', searchProperty);

module.exports = router;
