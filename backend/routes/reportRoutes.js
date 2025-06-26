// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitReport } = require('../controllers/reportController');

// ✅ Setup multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ Route to handle landlord negligence report
router.post('/report', upload.single('evidence'), submitReport);

module.exports = router;
