'use strict'
const createError = require('http-errors');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const all = require('require-all');
const lib = all(__dirname + '/lib'); // libディレクトリ直下のファイルを一括読み込み
const routes = all(__dirname + '/routes');

const app = express();
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
const port = process.env.PORT || 8000;

// ルーティングハンドラ
app.get('/', routes.login);
app.use(lib.auth); // BASIC認証
app.get('/index', routes.index);
app.get('/upload', routes.upload.Get);
app.post('/upload', lib.renameFile.single(), routes.upload.Post);
app.get('/chart', routes.chart);
app.get('/chart?delete=1', routes.delete.handleDelete);
app.get('/chart?edit=1', routes.edit.handleEdit);
app.get('/logout', routes.logout);
app.get('/favicon.ico', routes.favicon);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function(){
	console.log(`listening on port ${port}!`);
});	