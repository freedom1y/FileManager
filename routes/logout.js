const mklog = require('../lib/mklog');
const auth = require('basic-auth');

module.exports = (req, res) => {
  // console.log('logout');
  const userInfo = auth(req); 
  mklog.log('logout', req);
  
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  
  res.end(
    '<!DOCTYPE html>' +
      '<html lang="ja">' +
      
      '</html>' +

      '<head>' +
        '<meta charset="UTF-8">' +
        '<title>logout</title>' +
        '<link rel="stylesheet" href="/css/style.css">' +
      '</head>' +

      '<body>' +
        '<div class="top-wrapper">' +
            '<div class="top-image">' +
                '<img src="/images/logo.jpg">' +
            '</div>' +
            '<p class="description">' +
                'ログアウトしました。' +
            '</p>' +
            '<ul>' +
                '<li><a href="/" class="button">ログイン画面</a></li><br>' +
            '</ul>' +
        '</div>' +
      '</body>' +

    '</html>'
  );
}