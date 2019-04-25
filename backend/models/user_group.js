const Sequelize = require('sequelize');
const db = require('../database/db');

const UserGroup = db.sequelize.define('user_group', {
  user_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'user',
      key: 'oid'
    }
  },
  group_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'group',
      key: 'oid'
    }
  }
}, {
    tableName: 'user_group'
  });

module.exports = UserGroup;