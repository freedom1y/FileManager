// POSTリクエスト
const Post = require('../lib/post');

function projectList(req, res) {
  Post.findAll({
    order: [['project', 'ASC']]
  }).then((posts) => {
    res.render('projectList', {
      xlsk: posts
    });
  });
}

module.exports = {
  projectList
}