const post = require('../lib/post');
const mklog = require('../lib/mklog');

function Delete(req, res){
  post.destroy({
    where: {
      id: req.query.id
    }
  }).then((deleteData) =>{
    mklog.log("delete id = " + req.query.id, req);
    post.findAll({
      order: [['project', 'ASC']]
    }).then((posts) =>{
      res.render('chart', {
        xlsk: posts
      });
    });
    
  }).catch((err) => {
    mklog.log("delete false", req);
    post.findAll({
      order: [['project', 'ASC']]
    }).then((posts) =>{
      res.render('chart', {
        xlsk: posts
      });
    });
  });
}


module.exports = {
  Delete
}