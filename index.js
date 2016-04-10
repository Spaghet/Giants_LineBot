'use strict';
//Lets require/import the HTTP module
var http = require('http');
var qs = require('querystring');
var send = require('./send');
var handleContent = require('./scripted_fsm').completeScript;
var curlScript = require('./scripted_fsm').curl;
var CONST = require('./const').const;

//Lets define a port we want to listen to
const PORT= process.env.PORT || 5000;

//We need a function which handles requests and send response
function handleRequest(request, response){
if(request.method == "POST"){
    handlePostRequest(request, response);
    return;
}else if(request.method == "PUT"){
  curlScript();
}else{
  console.log(request.method);
  response.end("You didn't POST");
}
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on:", PORT);
});

//Handle stuff
function handlePostRequest(req, res){
  var data = new Buffer(0);
  req.on('data', function(chunk){
    data = Buffer.concat([data, chunk], data.length + chunk.length);
  });
  req.on('end', function(chunk){
    if(chunk){
      data = Buffer.concat([data, chunk], data.length + chunk.length);
    }
    data = JSON.parse(data.toString());
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

function handleOperation(content){
  console.log(content);
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
