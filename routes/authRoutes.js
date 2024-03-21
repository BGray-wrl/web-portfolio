const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/auth/register', (req, res) => {
  res.render('register', { csrfToken: req.csrfToken() });
});

router.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // User model will automatically hash the password using bcrypt
    await User.create({ username, password });
    console.log(`New user registered: ${username}`);
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', { error: 'Failed to register. Please try again.', csrfToken: req.csrfToken() });
  }
});

router.get('/auth/login', (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Login attempt failed - User not found');
      return res.render('login', { error: 'User not found', csrfToken: req.csrfToken() });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.userId = user._id;
      console.log(`User logged in successfully: ${username}`);
      return res.redirect('/');
    } else {
      console.log('Login attempt failed - Password is incorrect');
      return res.render('login', { error: 'Password is incorrect', csrfToken: req.csrfToken() });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'An error occurred during login. Please try again.', csrfToken: req.csrfToken() });
  }
});

router.get('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error during session destruction:', err);
      return res.status(500).send('Error logging out');
    }
    console.log('User logged out successfully');
    res.redirect('/auth/login');
  });
});

module.exports = router;