const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();

router.get('/about', (req, res) => {
  try {
    res.render('about');
  } catch (error) {
    console.error(`Error rendering the About page: ${error.message}`, error.stack);
    res.status(500).send('An error occurred while trying to display the About page.');
  }
});

router.get('/projects', (req, res) => {
  projectController.getProjectsByCategory(req, res).catch(error => {
    console.error(`Error rendering the Projects page: ${error.message}`, error.stack);
    res.status(500).send('An error occurred while trying to display the Projects page.');
  });
});

router.get('/resume', (req, res) => {
  try {
    res.render('resume');
  } catch (error) {
    console.error(`Error rendering the Resume page: ${error.message}`, error.stack);
    res.status(500).send('An error occurred while trying to display the Resume page.');
  }
});

router.get('/contact', (req, res) => {
  try {
    res.render('contact', { csrfToken: req.csrfToken() }); // Pass CSRF token to the template
  } catch (error) {
    console.error(`Error rendering the Contact page: ${error.message}`, error.stack);
    res.status(500).send('An error occurred while trying to display the Contact page.');
  }
});

module.exports = router;