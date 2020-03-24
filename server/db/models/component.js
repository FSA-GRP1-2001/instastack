const Sequelize = require('sequelize');
const db = require('../db');

const tagConstants = {
  p: { open: '<p>', close: '</p>' },
  ul: { open: '<ul>', close: '</ul>' },
  li: { open: '<li>', close: '</li>' },
  div: { open: '<div>', close: '</div>' },
  header: { open: '<header> <h1>', close: '</h1></header>' },
  img: { open: '<img src="', close: '">' },
  button: { open: '<button type="button">', close: '</button>' },
  // navbar: { open: '<div>', close: '</div>' },
  footer: { open: '<footer><p>', close: '</p></footer>' },
  // form: { open: '<div>', close: '</div>' },
  // twoColumnText: { open: '<div>', close: '</div>' },
};

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

Component.afterCreate(async component => {
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

module.exports = Component;
