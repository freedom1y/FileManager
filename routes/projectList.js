const File = require('../models/file');

module.exports = function(req, res) {
  File.findAll({
    order: [['fileId', 'DESC']]
  }).then((file) => {
    res.render('projectList', {
      xlsk: file
    });
  });
}