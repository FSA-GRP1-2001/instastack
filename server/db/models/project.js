const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  gitUrl: {
    type: Sequelize.STRING,
  },
  externalUrl: {
    type: Sequelize.TEXT,
  },
  usedContainers: {
    type: Sequelize.TEXT,
  },
  usedComponents: {
    type: Sequelize.TEXT,
  },
  usedStyles: {
    type: Sequelize.TEXT,
  },
});

module.exports = Project;
