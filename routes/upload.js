const analyze = require('../lib/analyze');
const mklog = require('../lib/mklog');
// GETリクエスト
function Get(req, res) {
  res.render('upload.ejs');
}

// POSTリクエスト
function Post(req, res) {
  analyze.xlskObject(req.file.originalname);
  res.render('upload', {data: req.file.originalname});
  mklog.log('UploadFile ' + req.file.originalname, req);
}

module.exports = {
  Get, Post
}