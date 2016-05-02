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
  handlePostRequest(req, res);
});

app.put("/", function(req, res){
  bodyString(req, res, function(err, body){
    if(err){
      res.statusCode = 500;
      res.end(err.message);
    }
    if(body == "reset"){
      resetScript();
    }else{
      curlScript();
    }
    res.end(body);
  });
});

app.listen(PORT, function(){
  console.log("listening on PORT: " + PORT);
});

function handlePostRequest(req, res){
  bodyString(req, res, function(err, body){
    if(err){
      console.log(err);
      res.statusCode = 500;
      res.end(err.message);
    }
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
