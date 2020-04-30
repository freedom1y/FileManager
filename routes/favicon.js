const fs = require('fs');

module.exports = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon'
  });
  const favicon = fs.readFileSync('./public/images/logo.jpg');
  res.end(favicon);
}