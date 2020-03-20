const router = require('express').Router();
const { Project } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    // will add attributes once i see whats in the models
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleProject = await Project.findByPk(req.params.id);
    if (!singleProject) {
      const error = Error('Sorry we currently do not have that project listed');
      error.status = 404;
      return next(error);
    } else {
      res.json(singleProject);
    }
  } catch (error) {
    next(error);
  }
});
