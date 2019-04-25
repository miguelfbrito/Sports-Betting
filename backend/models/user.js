const Sequelize = require('sequelize');
const db = require('../database/db');
const Bet = require('./bet')

const User = db.sequelize.define('user', {
    oid: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    balance: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    // group_oid: {
    //     type: Sequelize.INTEGER(11),
    //     allowNull: true,
    //     references: {
    //         model: 'group',
    //         key: 'oid'
    //     }
    // }
}, {
        tableName: 'user'
    });

User.hasMany(Bet);

module.exports = User;