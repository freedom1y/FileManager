function handleEdit(req, res){
  console.log("test edit")
  res.render('chart', {
    xlsk: posts
  });
}


module.exports = {
  handleEdit
}