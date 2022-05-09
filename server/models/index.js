// const Sequelize = require('sequelize');
const sequelize = require('../util/database.js');

const Profile = require('./profile');
const Quest = require('./quest');
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

// module.exports = {Profile, Quest};