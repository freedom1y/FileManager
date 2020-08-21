const File = require('../models/file');
const BugContent = require('../models/bugContent');
const Details = require('../models/details');
const Account = require('../models/account');
const mklog = require('../lib/mklog');

// GETリクエスト
function Get(req, res) {
  File.findOne({
    where: {
      fileId: req.query.id
    }
  }).then((file) => {
    BugContent.findAll({
      include: [{
          model: Details,
        }],
      where: {fileId: file.fileId},
      order:[['bugId', 'ASC']]

    }).then((data) => {
      Account.findAll({
        order: [['accountId', 'ASC']]
      }).then((accounts) =>{
        res.render('approve', {
          xlsk: data,
          accounts: accounts,
          fileName: file.fileName
        });
      })
    });

  });
}

// POSTリクエスト
function Post(req, res) {
  File.findOne({
    where: { fileId: req.body.fileId }
  }).then((file) => {
    file.update({
      status: req.body.accountId
    });

    BugContent.findAll({
      include: [{
          model: Details,
        }],
      where: {fileId: file.fileId},
      order:[['bugId', 'ASC']]

    }).then((data) => {
      Account.findAll({
        order: [['accountId', 'ASC']]
      }).then((accounts) =>{
        res.render('approve', {
          xlsk: data,
          accounts: accounts,
          fileName: file.fileName,
          updateMsg: "承認完了"
        });
      })
    });

  });
}

module.exports = {
  Get, Post
}
