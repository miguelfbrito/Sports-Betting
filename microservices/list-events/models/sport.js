const Sequelize = require('sequelize');
const db = require('../database/db');
const BetTypeSport = require('./bettype_sport')


const Sport = db.sequelize.define('sport', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
    tableName: 'sport'
  });

Sport.hasMany(BetTypeSport);

module.exports = Sport;