const post = require('../lib/post');

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
      note: req.body.note
    });
    console.log("updated!")
    res.render('edit', {
      editTarget: updateData,
      updateMsg: "更新しました"
    });
  });
}

module.exports = {
  Get, Post
}
