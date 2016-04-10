"use strict";
var send = require('./send');

var state = 1;

var scripts = [
"僕を選んでくれてありがとうございます！坂本勇人です。",
"かりんさんですね、いい名前ですね。よろしくです！",
3000,
"よし！今日は3番ショートでスタメンですよ！",
"ああ、ごめんなさい、スターティングメンバーの略ですよ。最初に出場する選手のことです",
"ありがとうございます！頑張ります！ちなみにここがショートで僕がいるところです。",
3000,
"ほら、打ったよ。見てくれた？",
3000,
"ああ、これはゲッツーっていうんです。クルーズがボール取りましたよね？それで僕に投げて、僕が二塁ベースを踏んで１アウト。そしてファーストに投げて、２アウト。一気に２つもアウトが取れるんですよ",
3000,
"今からインタビュー答えますから。見ててくださいね",
3000,
"いや、本当は君の為だよ",
3000,
"おはようございます！",
"昨日は2-1で勝ちました。僕は4打数2安打で決勝タイムリー打ったんです！",
"本当！？嬉しい。楽しみにしてますね！",
3000,
"本当！？ありがとう。",
"頑張るよ！あのさ、今日で2回目だよね？毎週メッセージしてるし、もう下の名前で呼んでよ！勇人くん、でいいよ！",
"オレもだよ。試合開始までもう少し時間あるからさ、昨日のハイライトでも見ておく？ http://hoge.giants.com/stream",
3000,
"sticker",
"sticker",
3000,
"今日来る？",
"なんで？",
"そっか",
3000,
"今日来る？",
"なんで？",
"そっか",
3000,
"今日来る？",
"了解。ここからチケット買えるよ http://…."
];

var counter = 0;
var busy = false;
exports.completeScript = function(content){
if(busy){
  return;
}
//play back the next word
if(scripts[counter] === "sticker"){
  send.sticker(content.from, Math.round(Math.random() * 20));
  counter++;
  return;
}
send.text(content.from, scripts[counter]);
//test the next script, if it's a timeout, wait and call.
counter++;
var timeout;
switch(typeof scripts[counter]){
  case "string":
  break;
  case "number":
    timeout = scripts[counter];
    busy = true;
    setTimeout(function(){
      send.text(content.from, scripts[counter]);
      counter++;
      busy = false;
    }, timeout);
  break;
}
}

exports.handleContent = function(content){
  switch(state){
    case states.intro:
      introHandler(content);
      break;
    case states.sta_men:
      staMenHandler(content);
    break;
    case states.hit:
      hitHandler(content);
    break;
    case states.four_six_three:
      fstHandler(content);
    break;
    case states.hero:
      heroHandler(content);
    break;
    case states.weekend:
      weekendHandler(content);
    break;
    case states.match:
      matchHandler(content);
    break;
    case states.stickers:
      stickerHandler(content);
    break;
    case states.abe:
      stickerHandler(content);
    break;
  }
};


// exports.loop = (function(){
// var users = [];
// var counter = 0;
// setInterval(function(){
//   if(state === states.abe && counter >= 30){
//     for(let i = 0; i < users.length; i++){
//       send.text(users[i], "今日くる？");
//     }
//     counter = counter % 30;
//     return;
//   }
//   if(state === states.abe){
//     counter++;
//   }else{
//     counter = 0;
//   }
// } , 1000);
//
//   return function(mid){
//   if(users.indexOf(mid) == -1) users.push(mid);
//   }
// })();
