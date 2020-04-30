// GETリクエスト
function Get(req, res) {
  res.render('upload.ejs');
}

// POSTリクエスト
function Post(req, res) {
  res.render('upload', {data: req.file.originalname});
}

module.exports = {
  Get, Post
}