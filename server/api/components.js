const router = require('express').Router();
const { Component } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allComponents = await Component.findAll();
    res.json(allComponents);
  } catch (error) {
    next(error);
  }
});
