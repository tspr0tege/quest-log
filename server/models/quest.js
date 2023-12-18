const Sequelize = require('sequelize');
const sequelize = require('../util/database.js');

const Quest = sequelize.define('Quest', 
  {
    quest_id: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    owner_id: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    title: {
      type: Sequelize.STRING(250),
      allowNull: false
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    parent_id: {
      type: Sequelize.UUID,
      allowNull: true
    },
    prog_to_parent: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    time_frame: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    progress: {
      type: Sequelize.REAL,
      defaultValue: 0
    },
    child_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_complete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {indexes: [
    {fields: ['owner_id', 'parent_id']}
  ]}
);

module.exports = Quest;