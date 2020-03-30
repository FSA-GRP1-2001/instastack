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

//GET by is
router.get('/:id', async (req, res, next) => {
  try {
    console.log('in projects/:id');

    const singleProject = await Project.findOne({
      where: {
        id: +req.params.id,
      },
      include: [{ model: User }],
    });
    res.json(singleProject);
  } catch (error) {
    next(error);
  }
});

// router.get('/:id', async (req, res, next) => {
//   try {
//     const singleProject = await Project.findByPk(req.params.id);
//     if (!singleProject) {
//       const error = Error('Sorry we currently do not have that project listed');
//       error.status = 404;
//       return next(error);
//     } else {
//       res.json(singleProject);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

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

router.put('/:id/users', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    const { userId } = req.body;
    await project.addUser(userId);
    const updatedProj = await Project.findByPk(req.params.id, {
      include: { model: User },
    });
    res.json(updatedProj);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/users', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    const { userId } = req.body;
    await project.removeUser(userId);
    const updatedProj = await Project.findByPk(req.params.id, {
      include: { model: User },
    });
    res.json(updatedProj);
  } catch (error) {
    next(error);
  }
});

//POST - Create a New Project w' title input field
router.post('/', async (req, res, next) => {
  try {
    let { title, userId } = req.body;
    const project = await Project.create({ title });
    const user = await User.findByPk(userId);
    await project.addUser(user);
    await project.save();
    res.status(201).json(project);
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

router.delete('/:projectId', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (!project) return res.sendStatus(404);
    await project.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
