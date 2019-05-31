const Sequelize = require('sequelize');
const db = require('../database/db');

// TODO : por terminar
const UserGroup = db.sequelize.define('user_group', {

}, {
    tableName: 'user_group'
  });

module.exports = UserGroup;