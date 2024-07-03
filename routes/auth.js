// routes/auth.js

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = await authService.registerUser(req);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(
      error = error.message
    );
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.loginUser(username, password);
    res.json({message:"Succesfully Loged In", token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Logout (placeholder, could involve token invalidation)
router.post('/logout', (req, res) => {
  // Implement logout logic (e.g., token invalidation)
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
