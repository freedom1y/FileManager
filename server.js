'use strict'
const path = require('path');
const express = require('express');
const all = require('require-all');
const lib = all(__dirname + '/lib'); // libディレクトリ直下のファイルを一括読み込み
const routes = all(__dirname + '/routes');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
const port = process.env.PORT || 8000;

// ルーティングハンドラ
app.get('/', routes.login);
// BASIC認証
app.use(lib.auth);
app.get('/index', routes.index);
app.get('/upload', routes.upload.Get);
app.post('/upload', lib.renameFile.single(), routes.upload.Post);
app.get('/chart', routes.chart);
app.get('/chart?delete=1', routes.delete.handleDelete);
app.get('/chart?edit=1', routes.edit.handleEdit);
app.get('/logout', routes.logout);
app.get('/favicon.ico', routes.favicon);

app.listen(port, function(){
	console.log(`listening on port ${port}!`);
});	