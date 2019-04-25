const Sequelize = require('sequelize');
const db = require('../database/db');

const BetTypeSport = db.sequelize.define('bettype_sport', {
  // bettype_oid: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: false,
  //   primaryKey: true,
  //   references: {
  //     model: 'bettype',
  //     key: 'oid'
  //   }
  // },
  // sport_oid: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: false,
  //   primaryKey: true,
  //   references: {
  //     model: 'sport',
  //     key: 'oid'
  //   }
  // }
}, {
    tableName: 'bettype_sport'
  });

module.exports = BetTypeSport;