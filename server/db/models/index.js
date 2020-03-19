const User = require('./user');
const Project = require('./project');

User.hasMany(Project, { as: 'project' });

module.exports = {
  User,
  Project,
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
