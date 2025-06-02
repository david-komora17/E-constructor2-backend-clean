const express = require('express');
const router = express.Router();
const { verifyMagistrateExternally } = require('../controllers/magistrateController');

router.post('/verify-external', verifyMagistrateExternally);

module.exports = router;
