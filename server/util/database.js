require('dotenv').config();
const Sequelize = require('sequelize');
// const { ModuleFilenameHelpers } = require('webpack');

const {
  PG_USER,
  PG_PASS,
  DATABASE_URL,
  DATABASE_PORT,
  DATABASE_NAME
} = process.env;

// const sequelize = new Sequelize(database, username, password, options);
const sequelize = new Sequelize(DATABASE_URL);

module.exports = sequelize;