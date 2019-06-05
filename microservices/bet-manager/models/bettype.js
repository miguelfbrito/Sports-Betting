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
    type: Sequelize.STRING(50),
    allowNull: true
  },
  bettypesportOid: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  }
}, {
    tableName: 'bettype'
  });


module.exports = BetType;