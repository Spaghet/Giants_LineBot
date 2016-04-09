var https = require('https');
var request = require('request');

const proxyUrl = process.env.FIXIE_URL || 	"http://fixie:qO8t5jn6Ahvz6ly@velodrome.usefixie.com:80";

var options = {
  "hostname": "trialbot-api.line.me",
  "path": "/v1/events",
  "headers": {
    "Content-type": "application/json; charset=UTF-8",
    "X-Line-ChannelID": "1462997838",
    "X-Line-ChannelSecret": "0e6392a115a2d65089479eb5334de457",
    "X-Line-Trusted-User-With-ACL": "ua9f4a868cf921b7f84075a766320b3ca"
  },
  "method": "POST"
};



exports.handle = function(toUser, text){

  var body = JSON.stringify({
    "to": [toUser],
    "toChannel": 1383378250,
    "eventType": "138311608800106203",
    "content": {
        "toType": 1,
        "contentType": 1,
        "text": text
      }
  });

  var proxiedReq = request.defaults({proxy: proxyUrl});

  proxiedReq(options,function(res){
    res.on('data', function(data){
      console.log(data.toString());
    });
  }).end(body);

};
