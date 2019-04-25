const Sequelize = require('sequelize');
const db = require('../database/db');

const AvailableBetType = db.sequelize.define('availablebettypes', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  odd: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  betresult: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  bettype_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'bettype',
      key: 'oid'
    }
  },
  event_oid: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    references: {
      model: 'event',
      key: 'event_oid'
    }
  }
}, {
    tableName: 'availablebettypes'
  });


module.exports = AvailableBetType;
