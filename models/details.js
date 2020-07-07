'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Details = loader.database.define('Details', {
  fileId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  bugId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  detailsId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  pgmId:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  task: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  taskPerson: {
    type: Sequelize.STRING,
    allowNull: true
  },
  progress: {
    type: Sequelize.STRING,
    allowNull: true
  },
  importance: {
    type: Sequelize.STRING,
    allowNull: true
  },
  taskDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  compDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  manHour: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  taskType: {
    type: Sequelize.STRING,
    allowNull: true
  },
  note: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = Details;