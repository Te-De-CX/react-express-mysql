// route.js
const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('./controller');
const { authenticateToken } = require('./middleware');

// Public routes
router.post('/signup', signup);
router.post('/signin', signin);

// Protected route (example)
router.post('/signout', authenticateToken, signout);

module.exports = router;