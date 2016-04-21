# Giants_LineBot

### 使い方

- 初期化

  `$ curl -X PUT -d "reset" http://giants-linebot.herokuapp.com`

- 次に進む

  `$ curl -X PUT http://giants-linebot.herokuapp.com`

- 文言変更
できればカギ括弧無しで、手動Inputを置きたい場所は１マス開ける形で。
  1. spreadsheetsで tools -> script editor -> コード.gs
  1. プレイボタンっぽいの。
  1. `ctrl + enter`
  1. JSONを `src/scripts.json`にコピペ
