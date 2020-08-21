const File = require('../models/file');
const BugContent = require('../models/bugContent');
const Details = require('../models/details');
const Account = require('../models/account');
const toSlack = require('../lib/slackNotice');

var worksheet, fileId, bugId;

function Get(req, res) {
  Account.findAll({
    order: [['accountId', 'ASC']]
  }).then((accounts) =>{
    // console.log(accounts[0].accountId)
    res.render('sheetJS',{
      accounts: accounts
    });
  })
}

function Post(req, res) {
  worksheet = req.body.output.slice();
  // console.log(req)
  File.findOne({
    where: { fileName: req.body.projectName }
  }).then(data => {
    if (data) {
      fileId = data.fileId;
      BugContentRegister();

    } else {
      File.create({
        fileName: req.body.projectName,
        status: req.body.status
      }).then(() => {
        File.max('fileId').then((num) => {
          fileId = num;
          
          // Account.create({
          //   slackId: "lexsol",
          //   accountName: "lexsol",
          //   password: "L123"
          // });
        
          BugContentRegister();
        });
      });

    }
    Account.findOne({
      where: { accountId: req.body.status }
    }).then((account) =>{
      toSlack.notice({ id: account.slackId });
    })
  });
}

function BugContentRegister(){
  var writeDt = new Date(worksheet[0][Object.keys(worksheet[0])[0]]);
  writeDt.setHours(writeDt.getHours() + 9);

  BugContent.create({
    fileId: fileId,
    title: worksheet[0][Object.keys(worksheet[0])[2]].replace(/\n/g, '<br>'),
    bugContent: worksheet[0][Object.keys(worksheet[0])[3]].replace(/\n/g, '<br>'),
    writer: worksheet[0][Object.keys(worksheet[0])[1]],
    writeDate: writeDt
  }).then(() => {
    BugContent.max('bugId').then((bugNum) => {
      bugId = bugNum;
      DetailsRegister();
    });
  });
}

function DetailsRegister(){
  var title = worksheet[0][Object.keys(worksheet[0])[2]];
  
  for (var i = 0; i < worksheet.length; i++) {
    var writeDt = new Date(worksheet[i][Object.keys(worksheet[i])[0]]);
    writeDt.setHours(writeDt.getHours() + 9);
    var taskDt = new Date(worksheet[i][Object.keys(worksheet[i])[9]]);
    taskDt.setHours(taskDt.getHours() + 9);
    var compDt = new Date(worksheet[i][Object.keys(worksheet[i])[10]]);
    compDt.setHours(compDt.getHours() + 9);

    if(title !== worksheet[i][Object.keys(worksheet[i])[2]]){
      BugContent.create({
        fileId: fileId,
        title: worksheet[i][Object.keys(worksheet[i])[2]].replace(/\n/g, '<br>'),
        bugContent: worksheet[i][Object.keys(worksheet[i])[3]].replace(/\n/g, '<br>'),
        writer: worksheet[i][Object.keys(worksheet[i])[1]],
        writeDate: writeDt
      });
      title = worksheet[i][Object.keys(worksheet[i])[2]];
      bugId++;
    }

    Details.create({
      fileId: fileId,
      bugId: bugId,
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