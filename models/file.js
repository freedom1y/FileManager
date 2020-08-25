'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const File = loader.database.define('File', {
  fileId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fileName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  firstStatus:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comment:{
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = File;