require('dotenv').config();
const Sequelize = require('sequelize');
// const { ModuleFilenameHelpers } = require('webpack');

const {
  PG_USER,
  PG_PASS,
  DATABASE_URL
} = process.env;

// const sequelize = new Sequelize(database, username, password, options);
const sequelize = new Sequelize('quest-log', PG_USER, PG_PASS, {
  host: DATABASE_URL,
  // port: 0,
  // username: '',
  // password: '',
  // database: '',
  dialect: 'postgres',
  // dialectModule: '',
  // dialectModulePath: ''
});

module.exports = sequelize;