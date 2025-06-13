// backend/routes/magistrateRoutes.js

const express = require('express');
const router = express.Router();
const { verifyMagistrateExternally } = require('../controllers/magistrateController');

// POST /api/magistrates/verify-external
router.post('/verify-external', verifyMagistrateExternally);

module.exports = router;
