'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/lexsol',
  {
    logging: false,
    operatorsAliases: '0' 
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
  enterDate: {
    type: Sequelize.DATEONLY
  },
  enterPerson: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  pgmId: {
    type: Sequelize.TEXT
  },
  task: {
    type: Sequelize.TEXT
  },
  taskPerson: {
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
    type: Sequelize.DOUBLE
  },
  taskType: {
    type: Sequelize.STRING
  },
  note: {
    type: Sequelize.TEXT
  },
  flag: {
    type: Sequelize.INTEGER
  },
  
}, {
  freezeTableName: true,
  timestamps: true
});

Post.sync();
module.exports = Post;
