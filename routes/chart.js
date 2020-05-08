const analyze = require('../lib/analyze');
const Post = require('../lib/post');

module.exports = (req, res) => {
  //analyze.xlskObject();
  
  Post.findAll().then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}
