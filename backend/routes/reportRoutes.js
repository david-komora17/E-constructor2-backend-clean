// backend/routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitReport } = require('../controllers/reportController');

// 📁 Setup Multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `evidence-${uniqueSuffix}${ext}`);
  }
});
const upload = multer({ storage });

// 🚨 POST /api/report — Handle report submissions
router.post('/', upload.single('evidence'), submitReport);

module.exports = router;
