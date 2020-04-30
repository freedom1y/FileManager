const fs = require('fs');

module.exports = (req, res) => {
  console.log('[' + new Date() + '] login ' + req.connection.remoteAddress);
  const filenames = fs.readdirSync("./uploads");

  res.render('index', {fileName: filenames});
}