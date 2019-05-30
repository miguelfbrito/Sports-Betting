const Sequelize = require('sequelize');
const db = require('../database/db');

const Event = require('./event');

const State = db.sequelize.define('state', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
    tableName: 'state'
  });

State.hasMany(Event);

module.exports = State;