const Sequelize = require('sequelize');
const db = require('../database/db');

const Stats = require('./stats');

// TODO : falta adicionar a key das stats
const BasketballStats = db.sequelize.define('basketballstats', {
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

BasketballStats.hasOne(Stats);

module.exports = BasketballStats;