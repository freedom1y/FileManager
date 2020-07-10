const toSlack = require('../lib/slackNotice');
const auth = require('basic-auth');


function Get(req, res) {
  const userInfo = auth(req);
  toSlack.notice();
  res.render('index', {userName: userInfo.name});
}

function Post(req, res) {
  const userInfo = auth(req);
  console.log(req.body.userId);
  toSlack.notice({id: req.body.userId});
  res.render('index', {userName: userInfo.name});
}

// POSTリクエスト



module.exports = {
  Get, Post
}