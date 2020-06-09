const post = require('../lib/post');

function Get(req, res){
  res.render('sheetJS');
}

function Post(req,res){
  console.log(req.body);

  var worksheet = req.body.output.slice();
  console.log(worksheet);
  for (var i = 0; i < worksheet.length; i++) {
    post.create({
      project:    aiueo,
      task:       worksheet[i][Object.keys(worksheet[0])[0]],
      person:     worksheet[i][Object.keys(worksheet[0])[1]],
      progress:   worksheet[i][Object.keys(worksheet[0])[2]],
      importance: worksheet[i][Object.keys(worksheet[0])[3]],
      taskDate:   worksheet[i][Object.keys(worksheet[0])[4]],
      compDate:   worksheet[i][Object.keys(worksheet[0])[5]],
      manHour:    worksheet[i][Object.keys(worksheet[0])[6]],
      taskType:   worksheet[i][Object.keys(worksheet[0])[7]],
      note:       worksheet[i][Object.keys(worksheet[0])[8]],
      flag:       0
    });
  }
}

module.exports = {
  Get, Post
}
