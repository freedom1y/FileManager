const post = require('../lib/post');

function Get(req, res) {
  res.render('sheetJS');
}

function Post(req, res) {
  console.log(req.body);

  var worksheet = req.body.output.slice();
  //console.log(Object.keys(worksheet[0]));
  //console.log(Object.keys(worksheet[0])[0]);
  //console.log(worksheet[0]);


  for (var i = 0; i < worksheet.length; i++) {
    var enterDt = new Date(worksheet[i][Object.keys(worksheet[i])[0]]);
    enterDt.setHours(enterDt.getHours() + 9);
    var taskDt = new Date(worksheet[i][Object.keys(worksheet[i])[9]]);
    taskDt.setHours(taskDt.getHours() + 9);
    var compDt = new Date(worksheet[i][Object.keys(worksheet[i])[10]]);
    compDt.setHours(compDt.getHours() + 9);

    post.create({
      project: req.body.projectName,
      enterDate: enterDt,
      enterPerson: worksheet[i][Object.keys(worksheet[i])[1]],
      title: worksheet[i][Object.keys(worksheet[i])[2]],
      content: worksheet[i][Object.keys(worksheet[i])[3]],
      pgmId: worksheet[i][Object.keys(worksheet[i])[4]],
      task: worksheet[i][Object.keys(worksheet[i])[5]],
      taskPerson: worksheet[i][Object.keys(worksheet[i])[6]],
      progress: worksheet[i][Object.keys(worksheet[i])[7]],
      importance: worksheet[i][Object.keys(worksheet[i])[8]],
      taskDate: taskDt,
      compDate: compDt,
      manHour: worksheet[i][Object.keys(worksheet[i])[11]],
      taskType: worksheet[i][Object.keys(worksheet[i])[12]],
      note: worksheet[i][Object.keys(worksheet[i])[13]],
      flag: 0
    });
  }
}

module.exports = {
  Get, Post
}
