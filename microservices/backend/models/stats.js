const Sequelize = require('sequelize');
const db = require('../database/db');

const Stats = db.sequelize.define('stats', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  gameduration: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
    tableName: 'stats'
  });
  
module.exports = Stats;