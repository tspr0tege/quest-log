require('dotenv').config();
const Sequelize = require('sequelize');
// const { ModuleFilenameHelpers } = require('webpack');

const { DATABASE_URL } = process.env;

// console.log(DATABASE_URL);

// const sequelize = new Sequelize(database, username, password, options);
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgresql'
});

module.exports = sequelize;