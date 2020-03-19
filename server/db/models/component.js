const Sequelize = require('sequelize');
const db = require('../db');

const Component = db.define('component', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  htmlTag: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'div',
    validate: {
      notEmpty: true,
    },
  },
  openTag: {
    type: Sequelize.STRING,
  },
  closeTag: {
    type: Sequelize.STRING,
  },
  textContent: {
    type: Sequelize.STRING,
  },
});

Component.beforeSave(async component => {
  const tag = component.htmlTag;
  if (component.openTag !== tagConstants[tag].open) {
    component.openTag = tagConstants[tag].open;
  }
  if (component.closeTag !== tagConstants[tag].close) {
    component.closeTag = tagConstants[tag].close;
  }
  await component.save();
  console.log('updated tags ', component);
});

const tagConstants = {
  p: { open: '<p>', close: '</p>' },
  ul: { open: '<ul>', close: '</ul>' },
  li: { open: '<li>', close: '</li>' },
  div: { open: '<div>', close: '</div>' },
};

module.exports = Component;
