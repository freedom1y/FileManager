const auth = require('basic-auth');
const mklog = require('../lib/mklog');//ログをコンソールとファイルに出力

module.exports = (req, res) => {
  const userInfo = auth(req); 
  if(typeof req.query.flag !== 'undefined'){
    mklog.log('login', req);
  }
  res.render('index', {userName: userInfo.name});
}