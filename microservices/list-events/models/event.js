const Sequelize = require('sequelize');
const db = require('../database/db');

const AvailableBetTypes = require('./availablebettypes');

const Event = db.sequelize.define('event', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true
  },
  finishingdate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  startingdate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  creationdate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  ispremium: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  state: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  sport: {
    type: Sequelize.STRING
  }
}, {
    tableName: 'event'
  });

Event.hasMany(AvailableBetTypes);

module.exports = Event;