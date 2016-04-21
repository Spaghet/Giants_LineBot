"use strict";

const app = require("express")();
const bodyString = require("body");
var send = require('./send');
var handleContent = require('./scripted_fsm').completeScript;
var curlScript = require('./scripted_fsm').curl;
var resetScript = require('./scripted_fsm').reset;
var CONST = require('./const').const;

const PORT = process.env.PORT || 5000;

app.post("/callback", function(req, res){
  handlePostRequest(res, res);
});

app.put("/", function(req, res){
  bodyString(req, res, function(err, body){
    if(body == "reset"){
      resetScript();
    }else{
      curlScript();
    }
  });
});

app.listen(PORT, function(){
  console.log("listening on PORT: " + PORT);
});

function handlePostRequest(req, res){
  bodyString(req, res, function(err, body){
    var data = JSON.parse(body.toString());
    handleJson(data);
    res.writeHead(200, {"Content-type": "text/plain"});
    res.end("");
  });
}

function handleJson(lineData){
  for(let i = 0; i < lineData.result.length;i++){
    let content = lineData.result[i].content;
    if(content.opType){
      handleOperation(content);
      return;
    }
      handleContent(content);
  }
}

function handleMessage(content){
  if(content.contentType === CONST.contentType.text){
    send.text(content.from, content.text);
    return;
  }else{
    send.image(content.from, //user mid
              "https://pbs.twimg.com/media/Bus5_vzCQAEN4z5.jpg", //big image
              "https://41.media.tumblr.com/024585fba025c9bcdde9e26fc943e9fa/tumblr_nwsj4msQIJ1uo43aqo3_250.png"); //preview image
  }
}
