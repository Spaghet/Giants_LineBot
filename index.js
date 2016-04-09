//Lets require/import the HTTP module
var http = require('http');
var qs = require('querystring');
var send = require('./send_text');

//Lets define a port we want to listen to
const PORT= process.env.PORT || 5000;
const channelId = 1462997838;
const channelSecret = "0e6392a115a2d65089479eb5334de457";
const MID = "ua9f4a868cf921b7f84075a766320b3ca";

//We need a function which handles requests and send response
function handleRequest(request, response){
if(request.method == "POST"){
      handlePostRequest(request, response);
    return;
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
    data = JSON.parse(data.toString());
    var contentType = data.result[0].content.contentType;
    var to = data.result[0].content.from;
    if(contentType == 1){
      var text = data.result[0].content.text;
      send(to, text);
    }else{
      var text = "ASJKALJDKWALDKA";
      send(to, text);
    }
res.writeHead(200, {"Content-type": "text/plain"});
res.end("");
  });
}
