const post = require('../lib/post');
var approveMsg = "";

function aptest(req, res) {
  console.log('test')
  // console.log(req)
  console.log(Object.keys(req.body));
  post.findAll({
    where: {
      flag: 1
    }
  }).then((posts) => {
    res.render('approve', {
      xlsk: posts,
      approveMsg: approveMsg
    });
  });
}




module.exports = {
  aptest
}