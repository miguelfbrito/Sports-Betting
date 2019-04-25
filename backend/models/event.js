const Sequelize = require('sequelize');
const db = require('../database/db');

const Event = db.sequelize.define('event', {
  event_oid: {
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
  },
  state_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'state',
      key: 'oid'
    }
  },
  sport_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'sport',
      key: 'oid'
    }
  }
}, {
    tableName: 'event'
  });

module.exports = Event;