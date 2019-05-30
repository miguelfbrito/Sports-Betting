const Sequelize = require('sequelize');
const db = require('../database/db');

const Bet = db.sequelize.define('bet', {
  oid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  wager: {
    type: Sequelize.DOUBLE,
    allowNull: true
  }
  // user_oid: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: true,
  //   references: {
  //     model: 'user',
  //     key: 'oid'
  //   }
  // },
  // event_oid: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: true,
  //   references: {
  //     model: 'event',
  //     key: 'event_oid'
  //   }
  // },
  // bettype_oid: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: true,
  //   references: {
  //     model: 'bettype',
  //     key: 'oid'
  //   }
  // },
  // result_oid: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: true,
  //   references: {
  //     model: 'result',
  //     key: 'oid'
  //   }
  // }
}, {
    tableName: 'bet'
  });

module.exports = Bet;