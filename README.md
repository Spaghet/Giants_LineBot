# Giants_LineBot

### 使い方

- 初期化

  `$ curl -X PUT -d "reset" http://giants-linebot.herokuapp.com`

- 次に進む

  `$ curl -X PUT http://giants-linebot.herokuapp.com`

- 文言変更
  - できればカギ括弧無しで、手動で喋らせたい（待たせたい）ところに適当な数字。
坂本のセリフだけをまとめた配列にする(整形トークSheet参照)


  1. spreadsheetsで tools -> script editor -> コード.gs
  1. プレイボタンっぽいの。
  1. `ctrl + enter`
  1. JSONを `src/scripts.json`にコピペ
