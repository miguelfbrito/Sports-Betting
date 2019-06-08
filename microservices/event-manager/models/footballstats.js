const Sequelize = require('sequelize');
const db = require('../database/db');

const Stats = require('./stats');

// TODO : falta adicionar a key das stats
const FootballStats = db.sequelize.define('footballstats', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
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

FootballStats.hasOne(Stats);

module.exports = FootballStats;