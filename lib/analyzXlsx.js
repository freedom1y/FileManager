'use strict';

//function analyzXlsx() { lexsol/FileManager-1/uploads/sample.xlsx
  let XLSX = require('xlsx')
  let workbook = XLSX.readFile('../uploads/sample.xlsx')

  let sheet_name_list = workbook.SheetNames
  let Sheet1 = workbook.Sheets[sheet_name_list[0]]  // シート1をデータを取得します
  let Sheet1_json = XLSX.utils.sheet_to_json(Sheet1)   // シート1のデータをJSONパースします

  // (例)シート1のセルA1の値をコンソールに出力します
  let Sheet1A1 = Sheet1['A1']//.v
  console.log(`シート1のセルA1の値：\n${Sheet1A1}`)

  // シート1の全ての値をコンソールに出力します
  console.log(`シート1の全ての値：`)
  for (let cl of Sheet1_json) {
    console.log(`${cl['A1の内容']} - ${cl['B1の内容']} - ${cl['C1の内容']}`)
  }
//}



// module.exports = {
//   analyzXlsx
// };