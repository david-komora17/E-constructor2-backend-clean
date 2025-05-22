// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/users/dashboard
// @desc    Protected route to show user dashboard
// @access  Private
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: `Welcome, user ${req.user.id}`
  });
});

module.exports = router;
