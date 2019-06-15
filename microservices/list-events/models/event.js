const Sequelize = require('sequelize');
const db = require('../database/db');

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
  sportOid: {
    type: Sequelize.INTEGER(11)
  }, availablebettypes: {
    type: Sequelize.TEXT
  },
  sportName: {
    type: Sequelize.STRING(25)
  }
}, {
    tableName: 'event'
  });

module.exports = Event;