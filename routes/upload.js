const analyze = require('../lib/analyze');

// GETリクエスト
function Get(req, res) {
  res.render('upload.ejs');
}

// POSTリクエスト
function Post(req, res) {
  analyze.xlskObject(req.file.originalname);
  res.render('upload', {data: req.file.originalname});
}

module.exports = {
  Get, Post
}