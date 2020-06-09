const Post = require('../lib/post');

module.exports = function(req, res) {
  Post.findAll({
    order: [['project', 'ASC']]
  }).then((posts) => {
    res.render('projectList', {
      xlsk: posts
    });
  });
}