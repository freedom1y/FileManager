const File = require('../models/file');
const BugContent = require('../models/bugContent');
const Details = require('../models/details');
const Account = require('../models/account');

function Delete(req, res) {
  Details.destroy({
    where: {
      detailsId: req.query.detailsId
    }
  }).then(() => {
    File.findOne({
      where: {
        fileId: req.query.fileId
      }
    }).then((file) => {
      Account.findOne({
        where: {
          accountId: file.status
        }
      }).then((account) => {
        BugContent.findAll({
          include: [{
            model: Details,
          }],
          where: { fileId: file.fileId },
          order: [['bugId', 'ASC']]
        }).then((data) => {
          res.render('chart', {
            accountName: account.accountName,
            xlsk: data,
            fileName: file.fileName,
            msg: "削除完了"
          });
        });
      });
    });
  }).catch((err) => {
    console.log("delete failed");
    File.findOne({
      where: {
        fileId: req.query.fileId
      }
    }).then((file) => {
      Account.findOne({
        where: {
          accountId: file.status
        }
      }).then((account) => {
        BugContent.findAll({
          include: [{
            model: Details,
          }],
          where: { fileId: file.fileId },
          order: [['bugId', 'ASC']]
        }).then((data) => {
          res.render('chart', {
            accountName: account.accountName,
            xlsk: data,
            fileName: file.fileName,
            msg: "削除失敗"
          });
        });
      });
    });
  });
}


module.exports = {
  Delete
}