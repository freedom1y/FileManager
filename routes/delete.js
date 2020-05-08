function handleDelete(req, res){
  console.log("test delete")
  res.render('chart', {
    xlsk: posts
  });
}


module.exports = {
  handleDelete
}