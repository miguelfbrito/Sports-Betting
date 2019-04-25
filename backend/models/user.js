var Sequelize = require('sequelize');
var db = require('../database/db');

var User = db.sequelize.define('user', {
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
        underscored: true,
        timestamps: false,
        createAt: false,
        paranoid: true
    });

User.sync({
    force: false
}).then(function () {
    return User.create({
        username: 'admin',
        password: 'admin',
        role: 1,
        name: 'admin'
    });
});

module.exports = User