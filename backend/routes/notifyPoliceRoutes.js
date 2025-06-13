// backend/routes/notifyPoliceRoutes.js

const express = require("express");
const router = express.Router();
const { notifyPolice } = require("../controllers/notifyPoliceController");

// POST /api/police/notify-police
router.post("/notify-police", notifyPolice);

module.exports = router;
