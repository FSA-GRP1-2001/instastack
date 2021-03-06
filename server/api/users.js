/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { User, Project } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'displayName'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET user by id
router.get('/:id', async (req, res, next) => {
  try {
    //console.log('in users/:id');
    const singleUser = await User.findOne({
      where: {
        id: +req.params.id,
      },
      include: [{ model: Project }],
    });
    res.json(singleUser);
  } catch (error) {
    next(error);
  }
});

//GET user by id + projects
router.get('/:id/projects', async (req, res, next) => {
  try {
    //console.log('in users/:id');
    const singleUser = await User.findOne({
      where: {
        id: +req.params.id,
      },
      include: [{ model: Project }],
    });
    res.json(singleUser);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/projects', async (req, res, next) => {
  try {
    let oneUser = await User.findByPk(req.params.id);
    // find or create project by name
    let { title } = req.body;
    const [project, _wasCreated] = await Project.findOrCreate({
      where: { title },
    });
    await oneUser.addProject(project);
    res.status(201).json(project); // send newly associated project to thunk
  } catch (error) {
    next(error);
  }
});

//api update
router.put('/:id', async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    const updateUser = await findUser.update(req.body);
    res.json({
      message: 'Updated successfully',
      findUser: updateUser,
    });
  } catch (error) {
    next(error);
  }
});

//api delete
router.delete('/:id', async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    const deleteMe = await findUser.destroy();

    res.status(200).send(`user ${deleteMe} has been delted`);
  } catch (error) {
    next(error);
  }
});
