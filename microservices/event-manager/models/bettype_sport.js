const Sequelize = require('sequelize');
const db = require('../database/db');

const BetTypeSport = db.sequelize.define('bettype_sport', {
  bettypeOid: {
    type: Sequelize.INTEGER(11),
    allowNull: true
    // references: {
    //   model: 'bettype',
    //   key: 'oid'
    // }
  },
  sportOid: {
    type: Sequelize.INTEGER(11),
    allowNull: true
    // references: {
    //   model: 'sport',
    //   key: 'oid'
    // }
  }
}, {
    tableName: 'bettype_sport'
  });

module.exports = BetTypeSport;