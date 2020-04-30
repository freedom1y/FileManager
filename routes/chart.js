const analyze = require('../lib/analyze.js');

module.exports = (req, res) => {
  let object = analyze.xlskObject();
  console.log(object);
  res.render('chart', {
    sheet: object.sheet,
    names: object.names,
    end: object.end
  });
}