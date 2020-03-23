const router = require('express').Router();
const { Project, User } = require('../db/models');

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

// GET api/users/projects
router.get('/:id/users', async (req, res, next) => {
  try {
    const singleProject = await Project.findByPk(req.params.id, {
      include: { model: User },
    });
    if (!singleProject) {
      const error = Error('Sorry we currently do not have that Project listed');
      error.status = 404;
      return next(error);
    } else {
      res.json(singleProject);
    }
  } catch (error) {
    next(error);
  }
});

//POST - Create a New Project
router.post('/', async (req, res, next) => {
  try {
    // let findUser = await User.findByPk(req.params.id);

    // find or create project by name
    let { title } = req.body;
    const project = await Project.create({ title });
    //await findUser.addProject(project);
    res.status(201).json(project); // send newly associated project to thunk
  } catch (error) {
    next(error);
  }
});

//PUT - Update Project
router.put('/:projectId', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);

    const updatedProject = await project.update(req.body, {
      where: { id: req.params.userId },
    });
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
});
