const Sequelize = require('sequelize');
const db = require('../database/db');

const Result = db.sequelize.define('result', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
    tableName: 'result'
  });

module.exports = Result;