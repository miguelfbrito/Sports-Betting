const Sequelize = require('sequelize');
const db = require('../database/db');

const Group = db.sequelize.define('group', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true
  },
  groupname: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
    tableName: 'group'
  });

module.exports = Group;