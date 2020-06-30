var X = XLSX;
var output = "";
var fileName = "";
var projectName = "";
var button = $("button#update");

// ファイル選択時のメイン処理
function handleFile(e) {
  // console.log(e)
  var files = e.target.files;
  var f = files[0];

  var reader = new FileReader();
  reader.onload = function (e) {
    var data = e.target.result;
    var wb;
    var arr = fixdata(data);
    wb = X.read(btoa(arr), {
      type: 'base64',
      cellDates: true,
    });
    console.log(wb)
    output = to_json(wb);// JSONが返ってくる
    console.log(output)
    
  };
  reader.readAsArrayBuffer(f);
}

// ファイルの読み込み
function fixdata(data) {
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

// ワークブックのデータをjsonに変換
function to_json(workbook) {
  if(fileName.indexOf('_案件一覧') === -1){
    console.log('ファイル形式が一致しません');
    button.attr("disabled", true);
    $('.not-fileName').html('ファイル形式が一致しません');
    return;
  }
  projectName = fileName.split('_')[0];
  button.attr("disabled", false);
  // console.log(projectName);

  let sheetNameList = workbook.SheetNames;                       // シート名一覧オブジェクト
  let workSheet = workbook.Sheets[sheetNameList[0]];
  let colNames = [
                  workSheet['C4'].w,
                  workSheet['D4'].w,
                  workSheet['E4'].w,
                  workSheet['F4'].w,
                  workSheet['G4'].w,
                  workSheet['H4'].w,
                  workSheet['I4'].w,
                  workSheet['J4'].w,
                  workSheet['K4'].w,
                  workSheet['L4'].w,
                  workSheet['M4'].w,
                  workSheet['N4'].w,
                  workSheet['O4'].w,
                  workSheet['P4'].w
                ];
  // console.log(colNames);

  let endCol = workSheet['!ref'].match(/\:[A-Z+]([0-9]+)/)[1];  // エクセルデータの末端の行数を取得する
  workSheet['!ref'] = `C4:P${endCol}`;                          // 取得したいセルの範囲を指定し直す。H4からP列の末端行まで
  // console.log(Object.keys(workSheet));
  let maxNum = 0;
  const newArray = Object.keys(workSheet).filter(element => (element.match(/^[C-P]\d+$/)));
  for(let i = 0; i < newArray.length; i++) maxNum = Math.max(maxNum, Number(newArray[i].slice(1)));
  // console.log(workSheet);

  // for(let i = 5; i <= maxNum; i++){

  //   if(i > 5){
  //     if(newArray.indexOf("C"+i) === -1) workSheet["C"+i] = {w: workSheet[]}
  //   }
  // }
  // altWorkSheet = {};
  for(let i = 5; i <= maxNum; i++){
    workSheet["C" + i] = {};
    workSheet["D" + i] = {};
    workSheet["E" + i] = {};
    workSheet["F" + i] = {};
    workSheet["G" + i] = {};
    workSheet["H" + i] = {};
    workSheet["I" + i] = {};
    workSheet["J" + i] = {};
    workSheet["K" + i] = {};
    workSheet["L" + i] = {};
    workSheet["M" + i] = {};
    workSheet["N" + i] = {};
    workSheet["O" + i] = {};
    workSheet["P" + i] = {};
  }
  // for(let i = 0; i < newArray.length; i++){
  //   altWorkSheet[newArray[i]] = workSheet[newArray[i]];
  // }
  // console.log(altWorkSheet);
  for(let i = 6; i <= maxNum; i++){
    if(Object.keys(workSheet["C" + i]).length === 0 && Object.keys(workSheet["C" + (i - 1)]).length !== 0) workSheet["C" + i] = workSheet["C" + (i - 1)];
    if(Object.keys(workSheet["D" + i]).length === 0 && Object.keys(workSheet["D" + (i - 1)]).length !== 0) workSheet["D" + i] = workSheet["D" + (i - 1)];
    if(Object.keys(workSheet["E" + i]).length === 0 && Object.keys(workSheet["E" + (i - 1)]).length !== 0) workSheet["E" + i] = workSheet["E" + (i - 1)];
    if(Object.keys(workSheet["F" + i]).length === 0 && Object.keys(workSheet["F" + (i - 1)]).length !== 0) workSheet["F" + i] = workSheet["F" + (i - 1)];
  }
  console.log(workSheet);

  let workSheet_json = X.utils.sheet_to_json(workSheet);        // JSONオブジェクトとして取得
  console.log(workSheet_json);
  return workSheet_json;
}
//  .[B-P]+\d


// 画面初期化
$(document).ready(function () {
  // ファイル選択欄 選択イベント
  // http://cccabinet.jpn.org/bootstrap4/javascript/forms/file-browser
  $('.custom-file-input').on('change', function (e) {
    handleFile(e);
    fileName = $(this)[0].files[0].name;
  })



  $("button#update").click(function (e) {
    $('.not-fileName').html('アップロードが完了しました。');
    // 多重送信を防ぐため通信完了までボタンをdisableにする
    button.attr("disabled", true);
    button.attr("style", "background-color:#cccccc");

    // 各フィールドから値を取得してJSONデータを作成
    console.log(output);
    $.ajax({
      url: "/upload",
      type: "POST",
      data: { 
        output: output,
        projectName: projectName 
      },
      dataType: "JSON",
      cache: false,
      success: function (data) {
        console.log("POST success");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log("POST false");
        console.log("XMLHttpRequest : " + XMLHttpRequest.status);
        console.log("textStatus     : " + textStatus);
        console.log("errorThrown    : " + errorThrown.message);
      },
      complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
          button.attr("disabled", false);  // ボタンを再び enableにする
          button.attr("style", "background-color:#ffffff");
      }

    });
  });

});

