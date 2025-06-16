const express = require('express');
const multer = require('multer');
const router = express.Router();

// Save uploaded files in 'uploads/' folder temporarily
const upload = multer({ dest: 'uploads/' });

router.post('/court-docs', upload.array('court_documents'), (req, res) => {
  const caseId = req.body.court_case_id;
  const files = req.files;
  console.log('✅ Received court case ID:', caseId);
  console.log('📄 Uploaded files:', files);
  res.json({ message: 'Court documents received successfully' });
});

module.exports = router;
