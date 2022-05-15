// const Sequelize = require('sequelize');
const sequelize = require('../util/database.js');

const Profile = require('./profile');
const Quest = require('./quest');
// const SubQuest = require('./subQuest');
// const List = require('./list');
// const ListItem = require('./listItem');

module.exports = {Profile, Quest};