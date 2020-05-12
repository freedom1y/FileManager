const analyze = require('../lib/analyze');
const Post = require('../lib/post');

module.exports = (req, res) => {
  Post.findAll().then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}
