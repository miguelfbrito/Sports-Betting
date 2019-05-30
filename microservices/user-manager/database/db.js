'use strict';

// Configuracao do sequelize: https://blog.rocketseat.com.br/nodejs-express-sequelize/

const drop_and_create = false;

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database');

const db = {};
const sequelize = new Sequelize(config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


if (drop_and_create) {
  console.log("Teste")
  sequelize.query("drop database bettingwebapp; create database bettingwebapp;")
}

sequelize.sync({ force: true });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
