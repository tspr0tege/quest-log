const Sequelize = require('sequelize');
const sequelize = require('../util/database.js');

const Quest = sequelize.define('Quest', {
  quest_id: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  quest_line_exp: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  owner_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  time_frame: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  // date_created: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW
  // },
  progress: {
    type: Sequelize.REAL,
    defaultValue: 0
  }
});

module.exports = Quest;