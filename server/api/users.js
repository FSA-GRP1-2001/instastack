const router = require('express').Router();
const { User } = require('../db/models');
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
    const singleUsers = await User.findByPk();
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
