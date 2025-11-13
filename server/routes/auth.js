const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Helper function to generate avatar
const generateAvatar = (name) => {
  const colors = [
    ['#667eea', '#764ba2'], // Purple gradient
    ['#f093fb', '#f5576c'], // Pink gradient
    ['#4facfe', '#00f2fe'], // Blue gradient
    ['#43e97b', '#38f9d7'], // Green gradient
    ['#fa709a', '#fee140'], // Orange gradient
    ['#30cfd0', '#330867'], // Teal gradient
    ['#a8edea', '#fed6e3'], // Light gradient
    ['#ff9a9e', '#fecfef'], // Pastel gradient
  ];

  const size = 100;
  const nameValue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorPair = colors[nameValue % colors.length];
  
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${nameValue}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colorPair[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colorPair[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#grad-${nameValue})" />
      <text x="50" y="50" text-anchor="middle" dy=".35em" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white">
        ${initials}
      </text>
    </svg>
  `)}`;
};

// Register
router.post('/register', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('fullName').trim().notEmpty().withMessage('Full name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, fullName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate avatar based on full name
    const avatar = generateAvatar(fullName);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      avatar
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        bio: user.bio
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
