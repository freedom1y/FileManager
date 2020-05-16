const Post = require('../lib/post');

module.exports = (req, res) => {
  Post.findAll({
    where: {
      flag: 0
    }
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}
