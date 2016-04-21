"use strict";
var send = require('./send');

var state = 1;

var scripts = [
"僕を選んでくれてありがとうございます！坂本勇人です。",
"かりんさんですね、いい名前ですね。よろしくです！",
3000,
"よし！今日は3番ショートでスタメンですよ！",
"ああ、ごめんなさい、スターティングメンバーの略ですよ。最初に出場する選手のことです",
"image",
"ありがとうございます！頑張ります！ちなみにここがショートで僕がいるところです。",
3000,
"ほら、打ったよ。見てくれた？",
3000,
"今のプレイわかった？これはゲッツーっていうんです。クルーズがボール取りましたよね？それで僕に投げて、僕が二塁ベースを踏んで１アウト。そしてファーストに投げて、２アウト。一気に２つもアウトが取れるんですよ",
3000,
"今からインタビュー答えますから。見ててくださいね",
3000,
"いや、本当は君の為だよ",
3000,
"おはようございます！",
"昨日は2-1で勝ちました。僕は4打数2安打で決勝タイムリー打ったんです！",
"本当！？嬉しい。楽しみにしてますね！",
3000,
"今日来てる？",
"本当！？ありがとう。",
"頑張るよ！あのさ、今日で2回目だよね？毎週メッセージしてるし、もう下の名前で呼んでよ！勇人くん、でいいよ！",
"オレもだよ。試合開始までもう少し時間あるからさ、昨日のハイライトでも見ておく？ http://...",
3000,
];

var counter = 0;
var busy = false;
var id = "udc4c94af0cf037a1bb9876e9d7023ecd";

exports.completeScript = function(content){
  id = content.from;
  console.log(content.from);
if(busy || !scripts[counter]){
  return;
}
//play back the next word
play(scripts[counter]);
counter++;
if(typeof scripts[counter] === "number"){
  busy = true;
  counter++;
}
};

exports.curl = function(){
  if(!scripts[counter]) return;
  busy = false;
  play(scripts[counter]);
  counter++;
  if(typeof scripts[counter] === "number"){
    busy = true;
    counter++;
  }
};

exports.reset = function(){
  busy = false;
  counter = 0;
};

function play(word){
  if(word === "sticker"){
    send.sticker(id, Math.round(Math.random() * 20));
    return;
  }
  if(word === "image"){
    send.image(id, "http://i.imgur.com/SmOcBAT.jpg","http://i.imgur.com/05eyT7D.jpg");
    counter++;
  }
  send.text(id, scripts[counter]);
}
