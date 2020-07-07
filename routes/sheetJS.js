// const post = require('../lib/post');
const File = require('../models/file');
const BugContent = require('../models/bugContent');
const Details = require('../models/details');
const Account = require('../models/account');

function Get(req, res) {
  res.render('sheetJS');
  // 主キーと外部キーを同一の値に保つため、以下の関数を使う
  File.max('fileId').then((a) => console.log(a));
}

function Post(req, res) {
  console.log(req.body);

  var worksheet = req.body.output.slice();

  Account.create({
    accountName: "lexsol"
  })

  File.create({
    fileName: req.body.projectName,
    status: 1
  });

  var enterDt = new Date(worksheet[0][Object.keys(worksheet[0])[0]]);
  enterDt.setHours(enterDt.getHours() + 9);

  BugContent.create({
    fileId: File.max('fileId'),
    title: worksheet[0][Object.keys(worksheet[0])[2]].replace(/\n/g, '<br>'),
    bugContent: worksheet[0][Object.keys(worksheet[0])[3]].replace(/\n/g, '<br>'),
    writer: worksheet[0][Object.keys(worksheet[0])[1]],
    writeDate: enterDt
  });
  var title = worksheet[0][Object.keys(worksheet[0])[2]];

  for (var i = 0; i < worksheet.length; i++) {
    enterDt = new Date(worksheet[i][Object.keys(worksheet[i])[0]]);
    enterDt.setHours(enterDt.getHours() + 9);
    var taskDt = new Date(worksheet[i][Object.keys(worksheet[i])[9]]);
    taskDt.setHours(taskDt.getHours() + 9);
    var compDt = new Date(worksheet[i][Object.keys(worksheet[i])[10]]);
    compDt.setHours(compDt.getHours() + 9);

    /*post.create({
      project: req.body.projectName,
      enterDate: enterDt,
      enterPerson: worksheet[i][Object.keys(worksheet[i])[1]],
      title: worksheet[i][Object.keys(worksheet[i])[2]].replace(/\n/g, '<br>'),
      content: worksheet[i][Object.keys(worksheet[i])[3]].replace(/\n/g, '<br>'),
      pgmId: worksheet[i][Object.keys(worksheet[i])[4]].replace(/\n/g, '<br>'),
      task: worksheet[i][Object.keys(worksheet[i])[5]].replace(/\n/g, '<br>'),
      taskPerson: worksheet[i][Object.keys(worksheet[i])[6]],
      progress: worksheet[i][Object.keys(worksheet[i])[7]],
      importance: worksheet[i][Object.keys(worksheet[i])[8]],
      taskDate: taskDt,
      compDate: compDt,
      manHour: worksheet[i][Object.keys(worksheet[i])[11]],
      taskType: worksheet[i][Object.keys(worksheet[i])[12]],
      note: worksheet[i][Object.keys(worksheet[i])[13]],
      flag: 0
    });*/

    if(title !== worksheet[i][Object.keys(worksheet[i])[2]]){
      BugContent.create({
        fileId: File.max('fileId'),
        title: worksheet[i][Object.keys(worksheet[i])[2]].replace(/\n/g, '<br>'),
        bugContent: worksheet[i][Object.keys(worksheet[i])[3]].replace(/\n/g, '<br>'),
        writer: worksheet[i][Object.keys(worksheet[i])[1]],
        writeDate: enterDt
      });
      title = worksheet[i][Object.keys(worksheet[i])[2]];
    }

    Details.create({
      fileId: File.max('fileId'),
      bugId: BugContent.max('bugId'),
      pgmId: worksheet[i][Object.keys(worksheet[i])[4]].replace(/\n/g, '<br>'),
      task: worksheet[i][Object.keys(worksheet[i])[5]].replace(/\n/g, '<br>'),
      taskPerson: worksheet[i][Object.keys(worksheet[i])[6]],
      progress: worksheet[i][Object.keys(worksheet[i])[7]],
      importance: worksheet[i][Object.keys(worksheet[i])[8]],
      taskDate: taskDt,
      compDate: compDt,
      manHour: worksheet[i][Object.keys(worksheet[i])[11]],
      taskType: worksheet[i][Object.keys(worksheet[i])[12]],
      note: worksheet[i][Object.keys(worksheet[i])[13]]
    });
  }
}

module.exports = {
  Get, Post
}
