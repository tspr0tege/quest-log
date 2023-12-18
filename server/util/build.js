// const Sequelize = require('sequelize');
const sequelize = require('./database.js');

const Profile = require('../models/profile');
const Quest = require('../models/quest');

sequelize.sync({alter: true})
  .then(console.log)
  .catch(console.log);
  