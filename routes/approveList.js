const File = require('../models/file');
const Account = require('../models/account');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function Get(req, res) {
    /*File.findAll({
      include: [{
          model: Account,
          attributes: [
            'accountId',
            'slackId',
            'accountName',
            'password'
          ]
        }],
      where: {
          status: { [Op.ne]: 1 }
      },
      order: [['status', 'DESC']]
    }).then((data) => {
      console.log(data);
      res.render('approveList', {
        xlsk: data,
      });
    });*/
    
    
    Account.findAll({
        include: [{
            model: File,
            attributes: [
              'fileId',
              'fileName',
            ]
          }],
        where: {
            accountId: { [Op.ne]: 1 }
        },
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