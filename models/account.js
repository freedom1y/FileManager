'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Account = loader.database.define('Account', {
  accountId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  slackId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  accountName: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = Account;