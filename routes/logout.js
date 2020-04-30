module.exports = (req, res) => {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  console.log('[' + new Date() + '] logout ' + req.connection.remoteAddress);
  res.end('<!DOCTYPE html><html lang="ja"><body>' +
    '<h1>ログアウトしました</h1>' +
    '<a href="/">ログイン</a>' +
    '</body></html>'
  );
}