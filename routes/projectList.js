const Post = require('../lib/post');
const File = require('../models/file');

module.exports = function(req, res) {
  File.findAll({
    order: [['fileId', 'DESC']]
  }).then((posts) => {
    console.log(posts);
    res.render('projectList', {
      xlsk: posts
    });
  });
}