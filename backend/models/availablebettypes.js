const Sequelize = require('sequelize');
const db = require('../database/db');

const AvailableBetType = db.sequelize.define('availablebettypes', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  odd: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  betresult: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
}, {
    tableName: 'availablebettypes'
  });


module.exports = AvailableBetType;
