const Post = require('../lib/post');

module.exports = (req, res) => {
  Post.findAll({
    order: [['project', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}
