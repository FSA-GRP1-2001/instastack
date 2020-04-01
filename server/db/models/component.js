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
  displayName: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  htmlTag: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'div',
    validate: {
      notEmpty: true,
    },
  },
  openTag: {
    type: Sequelize.TEXT,
  },
  textContent: {
    type: Sequelize.TEXT,
  },
  children: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  src: {
    type: Sequelize.TEXT,
  },
});

// Component.afterCreate(async component => {
//   const tag = component.htmlTag;
//   if (component.openTag !== tagConstants[tag].open) {
//     component.openTag = tagConstants[tag].open;
//   }
//   if (component.closeTag !== tagConstants[tag].close) {
//     component.closeTag = tagConstants[tag].close;
//   }
//   component.contentTag =
//     component.openTag + component.textContent + component.closeTag;
//   await component.save();
//   console.log('updated tags ', component);
// });

module.exports = Component;
