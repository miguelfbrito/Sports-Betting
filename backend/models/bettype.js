const Sequelize = require('sequelize');
const db = require('../database/db');

const BetType = db.sequelize.define('bettype', {
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
    tableName: 'bettype'
  });

module.exports = BetType;