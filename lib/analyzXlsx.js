'use strict';

function analyzXlsx() { 
  let XLSX = require('xlsx')
  let workbook = XLSX.readFile('./uploads/sample.xlsx')

  let sheet_name_list = workbook.SheetNames
  let Sheet1 = workbook.Sheets[sheet_name_list[0]]  // シート1をデータを取得します
  let Sheet1_json = XLSX.utils.sheet_to_json(Sheet1)   // シート1のデータをJSONパースします

//Sheet1　各要素のオブジェクトの属性t,v,r,h,w,をjsonで表示
//Sheet1_json １行目をカラム名(key名)としたJsonファイルを作成.中身は以下の通り。
// [ { A1: 'A2', B1: 'B2', C1: 'C2' },
//   { A1: 'A3', B1: 'B3', C1: 'C3' },
//   { A1: 'A4', B1: 'B4', C1: 'C4' },
//   { A1: 'A5', B1: 'B5', C1: 'C5' },
//   { A1: 'A6', B1: 'B6', C1: 'C6' } ]
//Sheet1_json はSheet1_json[整数]でしていの行を取得。
//Sheet1_json[整数]['key']でセルを一つ指定できる。
//console.log(Sheet1_json[2]['B1']); 　＝＞　B4
  
  // (例)シート1のセルA1の値をコンソールに出力します
  //let Sheet1A1 = Sheet1['A1'].v
  //console.log(`シート1のセルA1の値：\n${Sheet1A1}`)

// Key	Description
// v	raw value (see Data Types section for more info)
// w	formatted text (if applicable)
// t	type: b Boolean, e Error, n Number, d Date, s Text, z Stub
// f	cell formula encoded as an A1-style string (if applicable)
// F	range of enclosing array if formula is array formula (if applicable)
// r	rich text encoding (if applicable)
// h	HTML rendering of the rich text (if applicable)
// c	comments associated with the cell
// z	number format string associated with the cell (if requested)
// l	cell hyperlink object (.Target holds link, .Tooltip is tooltip)
// s	the style/theme of the cell (if applicable)

  // シート1の全ての値をコンソールに出力します
  //console.log(`シート1の全ての値：`)
  // for (let cl of Sheet1_json) {
  //   console.log(cl);
  //   //console.log(`${cl['A1の内容']} - ${cl['B1の内容']} - ${cl['C1の内容']}`)
  // }
  return Sheet1_json;
}



 module.exports = {
   analyzXlsx
 };