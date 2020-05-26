const fs = require('fs');
const auth = require('basic-auth');

module.exports = (req, res) => {
  console.log('[' + new Date() + '] login ' + req.connection.remoteAddress);
  //const filenames = fs.readdirSync("./uploads");
  const userInfo = auth(req); 
  //res.render('index', {fileName: filenames, userName: userInfo.name});
  res.render('index', {userName: userInfo.name});
}