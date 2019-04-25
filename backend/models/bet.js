const Sequelize = require('sequelize');
const db = require('../database/db');

const Bet = db.sequelize.define('bet', {
    id: {
        type: Sequelize.BIGINT(10),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    wager: {
        type: Sequelize.DOUBLE(),
        allowNull: false,
        unique: false,
    }
 }, {
        // underscored: true,
        // timestamps: false,
        // createAt: false,
        // paranoid: true
    });


module.exports = Bet