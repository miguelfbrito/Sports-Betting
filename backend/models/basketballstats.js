const Sequelize = require('sequelize');
const db = require('../database/db');

const BasketballStats = db.sequelize.define('basketballstats', {
    stats_oid: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'stats',
        key: 'oid'
      }
    },
    homepoints: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    awaytriples: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    hometriples: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    awaypoints: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'basketballstats'
  });

module.exports = BasketballStats;