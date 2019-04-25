const Sequelize = require('sequelize');
const db = require('../database/db');
const Bet = require('./bet')

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

Result.hasMany(Bet);

module.exports = Result;