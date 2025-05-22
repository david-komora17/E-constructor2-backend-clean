const express = require('express');
const router = express.Router();
const { registerProperty } = require('../controllers/propertyController');

router.post('/register', registerProperty);

module.exports = router;
