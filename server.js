'use strict'
const path = require('path');
const express = require('express');
const multer = require('multer');
const calc = require('./lib/calc.js')
const auth = require('./lib/auth');

const app = express();
const port = 8000;
// ファイル名を変更して保存
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(auth);

app.get('/', (req, res) => {
  calc.ranking();// このブロックは実行されているがこのライブラリ出力されない
  res.render('index.ejs');
});

app.get('/upload', (req, res) => {
  res.render('upload.ejs');
});

app.post('/upload', upload.single('file'), function (req, res) {
    //res.send(req.file.originalname + 'ファイルのアップロードが完了しました。');
    res.render('upload.ejs', {data: req.file.originalname});
    //uploadにレンダーして、送ったファイル名＋アップロード完了を表示する
});

app.get('/logout', (req, res) => {
  res.writeHead(401, {'Content-Type': 'text/plain; charset=utf-8'})
  res.end('ログアウトしました');
  return;
});

app.listen(port, function(){
	console.log(`listening on port ${port}!`);
});	

