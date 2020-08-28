const File = require('../models/file');
const Account = require('../models/account');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function Get(req, res) {
  Account.findAll({
    include: [{
        model: File
      }],
    order: [['accountId', 'DESC']]

  }).then((data) => {
    res.render('approveList', {
      xlsk: data,
    });
  });
}

module.exports = {
    Get
}