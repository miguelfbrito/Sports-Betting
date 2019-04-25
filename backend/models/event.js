const Sequelize = require('sequelize');
const db = require('../database/db');

const Event = db.sequelize.define('event', {
    id: {
        type: Sequelize.BIGINT(10),
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(50)
    },
    description: {
        type: Sequelize.STRING(500)
    },
    isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    creationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    startingDate: {
        type: Sequelize.DATE
    },
    finishingDate: {
        type: Sequelize.DATE
    }
}, {
        // underscored: true,
        // timestamps: false,
        // createAt: false,
        // paranoid: true
});


module.exports = Event