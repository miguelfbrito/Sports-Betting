const Sequelize = require('sequelize');
const db = require('../database/db');
const Bet = require('./bet');
const AvailableBetTypes = require('./availablebettypes');
const Stats = require('./stats');

const Event = db.sequelize.define('event', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  finishingdate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  startingdate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  creationdate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  ispremium: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
    tableName: 'event'
  });

Event.hasMany(Bet);
Event.hasMany(AvailableBetTypes);
Event.hasOne(Stats);

module.exports = Event;