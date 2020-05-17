'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/lexsol',
  {
    logging: false,
    operatorsAliases: false 
  });
const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project: {
    type: Sequelize.TEXT
  },
  task: {
    type: Sequelize.TEXT
  },
  person: {
    type: Sequelize.STRING
  },
  progress: {
    type: Sequelize.STRING
  },
  importance: {
    type: Sequelize.STRING
  },
  taskDate: {
    type: Sequelize.DATEONLY
  },
  compDate: {
    type: Sequelize.DATEONLY
  },
  manHour: {
    type: Sequelize.INTEGER
  },
  taskType: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.TEXT
  },
  flag: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: true
});

Post.sync();
module.exports = Post;
