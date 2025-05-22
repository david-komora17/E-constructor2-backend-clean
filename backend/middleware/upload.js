
// backend/middleware/upload.js

const express = require('express');
const fileUpload = require('express-fileupload');

// This middleware enables file uploads
const uploadMiddleware = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB
  abortOnLimit: true,
  createParentPath: true
});

module.exports = uploadMiddleware;
