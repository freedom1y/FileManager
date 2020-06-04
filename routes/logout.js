const mklog = require('../lib/mklog');
const auth = require('basic-auth');

module.exports = (req, res) => {
  // console.log('logout');
  const userInfo = auth(req); 
  mklog.log('logout', req);
  
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  
  res.end('<!DOCTYPE html><html lang="ja"><body>' +
    '<h1>ログアウトしました</h1>' +
    '<a href="/">ログイン</a>' +
    '</body></html>'
  );
}