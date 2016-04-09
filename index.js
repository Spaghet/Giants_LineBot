//Lets require/import the HTTP module
var http = require('http');
var qs = require('querystring');

//Lets define a port we want to listen to
const PORT= process.env.PORT || 8080;
const channelId = "1462997838";
const channelSecret = "0e6392a115a2d65089479eb5334de457";
const MID = "ua9f4a868cf921b7f84075a766320b3ca";

//We need a function which handles requests and send response
function handleRequest(request, response){
if(request.method == "POST"){
    request.on('data', function(data){
      handlePostRequest(request, response);
    });
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

function handlePostRequest(req, res){
  var data;
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function(chunk){
    data += chunk;
    data = data.toJson();
    console.log(data);
  });

}

function sendRequest(){
  var options = {
    host: "trialbot-api.line.me",
    path: "/v1/events",
    headers: {
      "Content-Type": "application/json; charser=UTF-8",
      "X-Line-ChannelID": channelId,
      "X-Line-ChannelSecret": channelSecret,
      "X-Line-Trusted-User-With-ACL": MID
    },
    method: "POST",
  };
  var body = qs.stringify({
    hoge: "hogehoge"
  });

  http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk.toString());
  });
}).end(body);
};
