const toSlack = require('../lib/slackNotice');
const auth = require('basic-auth');



function Get(req, res) {
  const userInfo = auth(req);
  toSlack.notice();
  res.render('index', { userName: userInfo.name });
}

function Post(req, res) {
  toSlack.notice({ id: req.body.userId });
  console.log(req.body.userId + "module done");
  const userInfo = auth(req);
  res.render('index', { userName: userInfo.name });
}


module.exports = {
  Get, Post
}