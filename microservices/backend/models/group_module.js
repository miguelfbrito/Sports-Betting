const Sequelize = require('sequelize');
const db = require('../database/db');

const GroupModule = db.sequelizee.define('group_module', {
  group_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'group',
      key: 'oid'
    }
  },
  module_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'module',
      key: 'oid'
    }
  }
}, {
    tableName: 'group_module'
  });

module.exports = GroupModule;