const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isAuthenticated } = require('./middleware/authMiddleware');
const csrf = require('csurf');
const csrfProtection = csrf();

router.get('/cms', isAuthenticated, csrfProtection, (req, res) => {
  projectController.listProjects(req, res).catch(err => {
    console.error('Error fetching projects:', err.message, err.stack);
    res.status(500).send('Failed to load project management page.');
  });
});

router.post('/cms/projects', isAuthenticated, csrfProtection, (req, res) => {
  projectController.createProject(req, res).catch(err => {
    console.error('Error creating project:', err.message, err.stack);
    res.status(500).send('Failed to create project.');
  });
});

// The method-override middleware allows this POST route to accept DELETE operations from forms
router.post('/cms/projects/:id', isAuthenticated, csrfProtection, (req, res) => {
  if (req.body._method === 'DELETE') {
    projectController.deleteProject(req, res).catch(err => {
      console.error('Error deleting project:', err.message, err.stack);
      res.status(500).send('Failed to delete project.');
    });
  } else {
    // Log an error if the _method is not recognized
    console.error('Unrecognized _method value received in request');
    res.status(400).send('Unrecognized operation requested.');
  }
});

module.exports = router;