const Project = require('../models/Project');

exports.listProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    console.log("Projects fetched successfully.");
    res.render('cms', { projects });
  } catch (error) {
    console.error('Error fetching projects:', error.message, error.stack);
    res.status(500).send('Error fetching projects');
  }
};

exports.createProject = async (req, res) => {
  try {
    await Project.create(req.body);
    console.log("Project created successfully.");
    res.redirect('/cms');
  } catch (error) {
    console.error('Create Project Error:', error.message, error.stack);
    res.status(500).send('Error creating project');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    console.log(`Project with id ${req.params.id} deleted successfully.`);
    res.redirect('/cms');
  } catch (error) {
    console.error('Delete Project Error:', error.message, error.stack);
    res.status(500).send('Error deleting project');
  }
};

exports.getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({});
    const categorizedProjects = projects.reduce((acc, project) => {
      const category = project.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    }, {});

    res.render('projects', { categorizedProjects });
    console.log("Projects categorized and fetched successfully.");
  } catch (error) {
    console.error('Error fetching projects by category:', error.message, error.stack);
    res.status(500).send('Error fetching projects by category');
  }
};