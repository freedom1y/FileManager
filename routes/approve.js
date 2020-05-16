const Post = require('../lib/post');

module.exports = (req, res) => {
  Post.findAll({
    where: {
      flag: 1
    }
  }).then((posts) => {
    res.render('approve', {
      xlsk: posts
    });
  });
}
