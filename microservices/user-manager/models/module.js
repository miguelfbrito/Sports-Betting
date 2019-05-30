const Sequelize = require('sequelize');
const db = require('../database/db');

const Module = db.sequelize.define('module', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true
  },
  moduleid: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  modulename: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
    tableName: 'module'
  });
  
module.exports = Module;