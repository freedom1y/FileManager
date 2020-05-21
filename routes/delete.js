const post = require('../lib/post');

function Delete(req, res){
  post.destroy({
    where: {
      id: req.query.id
    }
  }).then((deleteData) =>{
    console.log("delete id = " + req.query.id);
    post.findAll({
      order: [['project', 'ASC']]
    }).then((posts) =>{
      res.render('chart', {
        xlsk: posts
      });
    });
    
  }).catch((err) => {
    console.log("delete false");
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