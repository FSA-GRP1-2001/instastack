const Sequelize = require('sequelize');
const db = require('../db');

const tagConstants = {
  p: { open: '<p>', close: '</p>' },
  ul: { open: '<ul><li>', close: '</li></ul>' },
  //li: { open: '<li>', close: '</li>' },
  div: { open: '<div>', close: '</div>' },
  h1: { open: '<h1>', close: '</h1>' },
  img: { open: '<img src="', close: '" />' },
  button: { open: '<button type="button">', close: '</button>' },
  footer: { open: '<footer><p>', close: '</p></footer>' },
  html: {
    open:
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Project</title></head><body>',
    close: '</body></html>',
  },
  // navbar: { open: '<div>', close: '</div>' },
  navbar: {
    open: '<div class="topnav"><a href="#contact"',
    close: '</a></div>',
  },

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
  contentTag: {
    type: Sequelize.TEXT,
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
  component.contentTag =
    component.openTag + component.textContent + component.closeTag;
  await component.save();
  console.log('updated tags ', component);
});

module.exports = Component;
