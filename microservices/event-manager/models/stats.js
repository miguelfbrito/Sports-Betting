const Sequelize = require('sequelize');
const db = require('../database/db');

const Stats = db.sequelize.define('stats', {
    oid: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    gameduration: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    footballstatOid: {
        type: Sequelize.INTEGER(11)
    },
    basketballstatOid: {
        type: Sequelize.INTEGER(11)
    }
}, {
        tableName: 'stats'
    });

// TODO : será que o sequelize já suporta relações de herança?
// Por agora fica assim...

module.exports = Stats;