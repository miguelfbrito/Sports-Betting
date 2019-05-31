const Sequelize = require('sequelize');
const db = require('../database/db');
const Bet = require('./bet')
const BetTypeSport = require('./bettype_sport')

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
  }
}, {
    tableName: 'bettype'
  });

BetType.hasMany(Bet);
BetType.hasMany(BetTypeSport);

module.exports = BetType;