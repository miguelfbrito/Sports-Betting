const Sequelize = require('sequelize');
const db = require('../database/db');
const Bet = require('./bet')

const User = db.sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    role: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
 }, {
        // underscored: true,
        // timestamps: false,
        // createAt: false,
        // paranoid: true
    });

    console.log("Bet")
    console.log(Bet)
User.hasOne(Bet);


module.exports = User