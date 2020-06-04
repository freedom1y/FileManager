const post = require('../lib/post');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var approveMsg = "";
const mklog = require('../lib/mklog');
const auth = require('basic-auth');

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

// POSTリクエスト
function Post(req, res) {
  approveMsg = "承認しました";

  //承認ID、非承認IDに分ける
  let appIds = [];
  let unappIds = [];
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    if (req.body[Object.keys(req.body)[i]] === 'y') {
      appIds.push(Number(Object.keys(req.body)[i]));
    } else if(req.body[Object.keys(req.body)[i]] === 'n') {
      unappIds.push(Number(Object.keys(req.body)[i]));
    }
  }

  if(appIds.length){
    post.findAll({
      where: {
        id: { [Op.in]: appIds }
      }
    }).then((updateData) => {
      updateData.forEach((data) => {
        data.update({
          flag: 0
        });
      });
      mklog.log('approve rowid=' + appIds, req);
    });
  };
  
  if(unappIds.length){
    post.findAll({
      where: {
        id: { [Op.in]: unappIds }
      }
    }).then((updateData) => {
      updateData.forEach((data) => {
        data.update({
          flag: 2
        });
      });
      mklog.log('unapprove rowid=' + unappIds, req);
    });
  }
  post.findAll({
    where: {
      flag: 1,
      id: { [Op.notIn]: appIds.concat(unappIds) }
    }
  }).then((posts) => {
    res.render('approve', {
      xlsk: posts,
      approveMsg: approveMsg
    });
  });
}

module.exports = {
  Get, Post
}
