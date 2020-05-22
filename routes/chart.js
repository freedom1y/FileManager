const Post = require('../lib/post');

function display(req, res) {
  Post.findAll({
    order: [['project', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortTask(req, res) {
  Post.findAll({
    order: [['project', 'ASC'],['task', 'ASC']]
  //order の後の配列の中に配列を入る．増やしていけば前から順にソートされていく．
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortPerson(req, res) {
  Post.findAll({
    order: [['project', 'ASC'],['person', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortProgress(req, res) {
  Post.findAll({
    order: [['project', 'ASC'],['progress', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortImportance(req, res) {
  Post.findAll({
    order: [['project', 'ASC'],['importance', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortTaskDate(req, res) {
  Post.findAll({
    order: [['project', 'ASC'],['taskDate', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortCompDate(req, res) {
  Post.findAll({
    order: [['project', 'ASC'],['compDate', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortManHour(req, res) {
  Post.findAll({
    order: [['project', 'ASC'],['manHour', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}

function sortTaskType(req, res) {
  Post.findAll({
    order: [['project', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });
}


module.exports = {
  display, sortTask, sortPerson, sortProgress, sortImportance, sortTaskDate, sortCompDate, sortManHour, sortTaskType
}
