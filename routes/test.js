module.exports = (req, res) => {
  console.log(req.body);
  res.render('test', {
    data: req.body
  });
}
