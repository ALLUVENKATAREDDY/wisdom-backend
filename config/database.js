const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wisdom', 'root', 'pspk@777', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
