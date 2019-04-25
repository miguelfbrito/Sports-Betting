const Sequelize = require('sequelize');
const db = require('../database/db');

const FootbalStats = db.sequelize.define('footballstats', {
  stats_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'stats',
      key: 'oid'
    }
  },
  homegoals: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  },
  awaygoals: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  },
  awayyellowcards: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  },
  homeyellowcards: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  },
  awayredcards: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  },
  homeredcards: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  }
}, {
    tableName: 'footballstats'
  });

module.exports = FootbalStats;