const Sequelize = require('sequelize');
const db = require('../database/db');
const FootballStats = require('./footballstats');
const BasketballStats = require('./basketballstats');

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

// TODO : será que o sequelize já suporta relações de herança?
// Por agora fica assim...
Stats.hasOne(FootballStats);
Stats.hasOne(BasketballStats);

module.exports = Stats;