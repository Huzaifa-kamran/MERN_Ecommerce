const express = require('express');
const router = express.Router();
const { register, login, getUser, updateProfile } = require('../Controllers/Auth.controller');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user by ID route
router.get('/user/:id', getUser);

// Update profile route
router.put('/updateProfile/:id', updateProfile);

module.exports = router;