const router = require('express').Router();
const { User, Project } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'displayName', 'projects'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//test purposes
router.get('/:id', async (req, res, next) => {
  try {
    console.log('in users/:id');

    const singleUser = await User.findOne({
      where: {
        id: +req.params.id,
      },
      include: [{ model: Project }],
    });
    res.json(singleUser);
    console.log('in users/:id');
  } catch (error) {
    next(error);
  }
});

// router.get('/:id', async (req, res, next) => {
//   try {
//     const singleUsers = await User.findByPk(req.params.id);
//     if (!singleUsers) {
//       const error = Error('Sorry we currently do not have that user listed');
//       error.status = 404;
//       return next(error);
//     } else {
//       res.json(singleUsers);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// GET api/users/projects
router.get('/:id/projects', async (req, res, next) => {
  try {
    const singleUsers = await User.findByPk(req.params.id, {
      include: { model: Project },
    });
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
