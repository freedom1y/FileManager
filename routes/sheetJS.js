const post = require('../lib/post');

function Get(req, res) {
  res.render('sheetJS');
}

function Post(req, res) {
  console.log(req.body);
  console.log('post done')
  // res.render('sheetJS');

  var worksheet = req.body.output.slice();
  console.log(Object.keys(worksheet[0]));
  console.log(Object.keys(worksheet[0])[0]);
  console.log(worksheet[0]);


  for (var i = 0; i < worksheet.length; i++) {
    var taskDt = new Date(worksheet[i][Object.keys(worksheet[i])[4]]);
    taskDt.setHours(taskDt.getHours() + 9);
    if (Object.keys(worksheet[i]).length > 8) {
      var compDt = new Date(worksheet[i][Object.keys(worksheet[i])[5]]);
      compDt.setHours(compDt.getHours() + 9);
      post.create({
        project: "aiueo",
        task: worksheet[i][Object.keys(worksheet[i])[0]],
        person: worksheet[i][Object.keys(worksheet[i])[1]],
        progress: worksheet[i][Object.keys(worksheet[i])[2]],
        importance: worksheet[i][Object.keys(worksheet[i])[3]],
        taskDate: taskDt,
        compDate: compDt,
        manHour: worksheet[i][Object.keys(worksheet[i])[6]],
        taskType: worksheet[i][Object.keys(worksheet[i])[7]],
        note: worksheet[i][Object.keys(worksheet[i])[8]],
        flag: 0
      });
    } else {
      post.create({
        project: "aiueo",
        task: worksheet[i][Object.keys(worksheet[i])[0]],
        person: worksheet[i][Object.keys(worksheet[i])[1]],
        progress: worksheet[i][Object.keys(worksheet[i])[2]],
        importance: worksheet[i][Object.keys(worksheet[i])[3]],
        taskDate: taskDt,
        compDate: null,
        manHour: worksheet[i][Object.keys(worksheet[i])[5]],
        taskType: worksheet[i][Object.keys(worksheet[i])[6]],
        note: worksheet[i][Object.keys(worksheet[i])[7]],
        flag: 0
      });
    }
  }
}

module.exports = {
  Get, Post
}
