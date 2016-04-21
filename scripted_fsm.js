"use strict";
var send = require('./send');
const fs = require("fs");

const scriptPath = "./src/scripts.json";

var scripts = [];

var counter = 0;
var busy = false;
var id = "udc4c94af0cf037a1bb9876e9d7023ecd";

fs.readFile(scriptPath, 'utf-8', function(err, data){
  if(err){
    console.log(err);
    return;
  }
  scripts = JSON.parse(data);
});

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
  id = "udc4c94af0cf037a1bb9876e9d7023ecd";
  console.log("reset");
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
