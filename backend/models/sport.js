const Sequelize = require('sequelize');
const db = require('../database/db');

const Sport = db.sequelize.define('sport', {
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
    tableName: 'sport'
  });

module.exports = Sport;