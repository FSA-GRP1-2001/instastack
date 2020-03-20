const router = require('express').Router();
const { User, Project } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singleUsers = await User.findByPk(req.params.id);
    if (!singleUsers) {
      const error = Error('Sorry we currently do not have that user listed');
      error.status = 404;
      return next(error);
    } else {
      res.json(singleUsers);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:id/projects', async (req, res, next) => {
  try {
    let oneUser = await User.findByPk(req.params.id);
    // find or create project by name
    let { title } = req.body;
    const [project, wasCreated] = await Project.findOrCreate({
      where: { title },
    });
    await oneUser.addProject(project);
    res.sendStatus(201).json(project); // send newly associated project to thunk
  } catch (error) {
    next(error);
  }
});
