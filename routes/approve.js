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
function Post(req, res) {
  approveMsg = "承認しました";

  //承認したIDと非承認のIDを分ける
  appIds = []
  unappIds = []
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    if (req.body[Object.keys(req.body)[i]] === 'y') {
      appIds.push(Object.keys(req.body)[i])
    } else if(req.body[Object.keys(req.body)[i]] === 'n') {
      unappIds.push(Object.keys(req.body)[i])
    }
  }
  console.log('sep is ok')

  post.findAll({
    where: {
      id: {
        $in: [18, 17]
        //ラジオボックスでチェクをつけたカラムのIDの配列を渡すことで，この中のどれかにマッチする
      }
    }
  }).then((updateData) => {
    console.log('select is ok')
    updateData.update({
      flag: 0
    });
    console.log("approved!");
  });

  // post.findAll({
  //   where: {
  //     id: {
  //       $in: unappIds
  //       //ラジオボックスでチェクをつけたカラムのIDの配列を渡すことで，この中のどれかにマッチする
  //     }
  //   }
  // }).then((updateData) => {
  //   updateData.update({
  //     flag: 2
  //   });
  //   console.log("approved!");
  // });

  post.findAll({
    where: {
      flag: 1,
      id: { [Op.ne]: req.query.id } //where id != req.query.id
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
