// const Sequelize = require('sequelize');
const sequelize = require('./database.js');

const Profile = require('../models/profile');
const Quest = require('../models/quest');
// const SubQuest = require('./subQuest');
// const List = require('./list');
// const ListItem = require('./listItem');

Profile.hasMany(Quest, {
  foreignKey: 'profile_quest_owner',
  targetKey: 'owner_id'
});
Quest.belongsTo(Profile);

sequelize.sync({alter: true})
  .then(console.log)
  .catch(console.log);
  