const User = require('./user');
const Project = require('./project');
const Component = require('./component');

User.belongsToMany(Project, { through: 'user_project' });
Project.belongsToMany(User, { through: 'user_project' });

Project.belongsToMany(Component, { through: 'project_component' });
Component.belongsToMany(Project, { through: 'project_component' });

module.exports = {
  User,
  Project,
  Component,
};

/*
__proto__ methods on User
  _isAttribute: [Function (anonymous)],
  correctPassword: [Function (anonymous)],
  getProject: [Function (anonymous)],
  countProject: [Function (anonymous)],
  hasProject: [Function (anonymous)],
  setProject: [Function (anonymous)],
  addProject: [Function (anonymous)],
  removeProject: [Function (anonymous)],
  createProject: [Function (anonymous)]
*/
