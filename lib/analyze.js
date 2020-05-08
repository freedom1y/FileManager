'use strict';
const xlsk = require('xlsx');
const Post = require('./post');

function xlskObject() { 
  let workbook = xlsk.readFile('./uploads/案件一覧.xlsx');

  let sheetNameList = workbook.SheetNames;                      // シート名一覧オブジェクト
  let workSheet = workbook.Sheets[sheetNameList[0]];            // 1番目のシートのデータを取得
  let colNames = [workSheet['H4'].w,
                  workSheet['I4'].w,
                  workSheet['J4'].w,
                  workSheet['K4'].w,
                  workSheet['L4'].v,
                  workSheet['M4'].v,
                  workSheet['N4'].w,
                  workSheet['O4'].w,
                  workSheet['P4'].w];
  // カラムの名称配列(対応、対応者、進捗など)
  let endCol = workSheet['!ref'].match(/\:[A-Z+]([0-9]+)/)[1];  // エクセルデータの末端の行数を取得する
  workSheet['!ref'] = `H4:P${endCol}`;                          // 取得したいセルの範囲を指定し直す。H4からP列の末端行まで
  let workSheet_json = xlsk.utils.sheet_to_json(workSheet);     // JSONオブジェクトとして取得
  /* workSheet_json = [{'対応': 'テスト1対応',
                        '対応者': '市原',
                        '進捗': '未着手',

  }]
  */

  // DBへの登録
  /*for (var i = 0; i < 10; i++){
    Post.create({
      task:       workSheet_json[i][colNames[0]],
      person:     workSheet_json[i][colNames[1]],
      progress:   workSheet_json[i][colNames[2]],
      importance: workSheet_json[i][colNames[3]],
      taskDate:   workSheet_json[i][colNames[4]],
      compDate:   workSheet_json[i][colNames[5]],
      manHour:    workSheet_json[i][colNames[6]],
      taskType:   workSheet_json[i][colNames[7]],
      note:       workSheet_json[i][colNames[8]]
    });
  }
  */
 Post.findAll().then((posts) => {
  console.log(posts);
});
  
  // return { sheet: workSheet_json, names: colNames, end: endCol }
}

module.exports = {xlskObject} // {xlskObject: xlskObject}と同値