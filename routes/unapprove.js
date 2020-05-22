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

// 非承認
function Unapprove(req, res) {
  approveMsg = "非承認しました";
  post.findOne({
    where: {
      id: req.query.id
    }
  }).then((updateData) => {
    updateData.update({
      flag: 2
    });
    console.log("unapproved!");
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
    Unapprove(req, res);
  }else{
    Get(req, res);
  }
}