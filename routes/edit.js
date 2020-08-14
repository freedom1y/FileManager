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
  console.log(req.body.manHour)
  BugContent.findOne({
    where: { bugId: req.query.bugId }
  }).then((updateData1) => {
    Details.findOne({
      where: { detailsId: req.query.details }
    }).then((updatedata2) => {
      updatedata2.update({
        writer: req.body.write,
        writeDate: req.body.writeDate,
        title: req.body.title,
        bugContent: req.body.bugContent,
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
      }).then((updateData2) => {
        console.log("manHour:")
        console.log(req.body.manHour)
        console.log(updateData2.manHour)
        console.log("updateData:")
        console.log(updateData2.Details)
        res.render('edit', {
          editTarget: updateData2,
          updateMsg: "更新完了"
        });
      });
    });
  });
}

module.exports = {
  Get, Post
}
