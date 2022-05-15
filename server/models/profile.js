const Sequelize = require('sequelize');
const sequelize = require('../util/database.js');

const Profile = sequelize.define('Profile', {
  profile_id: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  exp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  photo_url: {
    type: Sequelize.TEXT,
    allowNull: true    
  }
});

module.exports = Profile;