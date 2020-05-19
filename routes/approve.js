const post = require('../lib/post');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var approveMsg = "";

// GETリクエスト
function Get(req, res) {
  approveMsg = "";
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

// 承認
function Approve(req, res) {
  approveMsg = "承認しました";
  post.findOne({
    where: {
      id: req.query.id
    }
  }).then((updateData) => {
    updateData.update({
      flag: 0
    });
    console.log("approved!");
  });

  post.findAll({
    where: {
      flag: 1,
      id: {[Op.ne]: req.query.id} //where id != req.query.id
    }
  }).then((posts) => {
    res.render('approve', {
      xlsk: posts,
      approveMsg: approveMsg
    });
  });
}

module.exports = (req, res) => {
  if(req.query.id){
    Approve(req, res);
  }else{
    Get(req, res);
  }
}