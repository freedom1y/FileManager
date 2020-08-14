const Account = require('../models/account');


function Get(req, res) {
  res.render('registAccount');
}

function Post(req, res) {
  Account.create({
    slackId: req.body.slackId,
    accountName: req.body.name,
    password: req.body.passWord
  })

  // Account.findAll({
  // }).then((accounts) => {
  //   console.log(accounts)
  // })
  res.render('registAccount');
}


module.exports = {
  Get, Post
}