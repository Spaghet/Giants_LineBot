function toJsonArray() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var range = sheet.getDataRange();
  var values = range.getValues();
  // 先頭一行目をプロパティ名にする
  var names = values[0];
  // カラム数分処理を走らせる
  var jsonArray = [];
  for(var i = 1; i < values.length; i++) {
    var jsonObject = new Object();
    for(var j = 0; j < names.length; j++) {
      jsonObject[names[j]] = values[i][j];
    }
    jsonArray.push(jsonObject);
  }
  // POSTデータ
  var jsonText = JSON.stringify(jsonArray);
  // ログとメッセージボックスに結果を表示
  Logger.log(jsonText);
  Browser.msgBox(jsonText, Browser.Buttons.OK);
}
