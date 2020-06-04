var fs = require("fs");
const auth = require('basic-auth');


function log(text, req) {
  // 非同期で行う場合
  var userInfo = auth(req);
  var logtxt = '[' + new Date() + '] ' + userInfo.name + ' ' + text + ' ' + req.connection.remoteAddress;
  fs.appendFile('logs/info.log', logtxt + '\n', (err, data) => {
    if (err) console.log(err);
    else console.log(logtxt);
    // console.log('module done!')
  });
}

// function err(text) {
//   // 非同期で行う場合
//   var userInfo = auth(req); 
//   logtxt = '[' + new Date() + '] ' + userInfo.name + text + req.connection.remoteAddress
//   fs.appendFile('logs/error.log', logtxt + '\n', (err, data) => {
//     if (err) console.log(err);
//     else console.log(logtxt);
//     // console.log('module done!')
//   });
// }

module.exports ={
  log
}
