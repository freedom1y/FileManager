const post = require('../lib/post');
const mklog = require('../lib/mklog');
const auth = require('basic-auth');

// GETリクエスト
function Get(req, res) {
  post.findOne({
    where: {
      id: req.query.id
    }
  }).then((post) => {
    res.render('edit', {
      editTarget: post
    });
  });
}

// POSTリクエスト
function Post(req, res) {
  post.findOne({
    where: {
      id: req.query.id
    }
  }).then((updateData) => {
    updateData.update({
      task: req.body.task,
      person: req.body.person,
      progress: req.body.progress,
      importance: req.body.importance,
      taskDate: req.body.taskDate,
      compDate: req.body.compDate,
      manHour: req.body.manHour,
      taskType: req.body.taskType,
      note: req.body.note,
      flag: 1
    });
    const userInfo = auth(req); 
    mklog.log('update rowid=' + req.query.id, req);
    res.render('edit', {
      editTarget: updateData,
      updateMsg: "更新完了"
    });
  });
}

module.exports = {
  Get, Post
}
