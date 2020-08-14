const File = require('../models/file');
const BugContent = require('../models/bugContent');
const Details = require('../models/details');
const Account = require('../models/account');
const mklog = require('../lib/mklog');
const auth = require('basic-auth');

// GETリクエスト
function Get(req, res) {
  BugContent.findOne({
    include: [{
      model: Details,
      where: { detailsId: req.query.details }
    }],
    where: { bugId: req.query.bugId }
  }).then((data) => {
    res.render('edit', {
      editTarget: data
    });
  });
}



// POSTリクエスト
function Post(req, res) {
  Details.findOne({
    where: { detailsId: req.query.details }
  }).then((updatedata) => {
    updatedata.update({
      pgmId: req.body.pgmId,
      task: req.body.task,
      taskPerson: req.body.taskPerson,
      progress: req.body.progress,
      importance: req.body.importance,
      taskDate: req.body.taskDate,
      compDate: req.body.compDate,
      manHour: req.body.manHour,
      taskType: req.body.taskType,
      note: req.body.note
    }).then(() => {
      BugContent.findOne({
        include: [{
          model: Details,
          where: { detailsId: req.query.details }
        }],
        where: { bugId: req.query.bugId }
      }).then((data) => {
        res.render('edit', {
          editTarget: data,
          updateMsg: "更新完了"
        });
      });
    });
  });
}

module.exports = {
  Get, Post
}
