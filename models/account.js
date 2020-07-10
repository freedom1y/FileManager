'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Account = loader.database.define('account', {
  accountId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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