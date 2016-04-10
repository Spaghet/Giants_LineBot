var https = require('https');
var request = require('request');

const proxyUrl = process.env.FIXIE_URL || 	"http://fixie:qO8t5jn6Ahvz6ly@velodrome.usefixie.com:80";


function send(body){
  var options = {
    "url": "https://trialbot-api.line.me/v1/events",
    "headers": {
      "Content-type": "application/json; charset=UTF-8",
      "X-Line-ChannelID": "1462997838",
      "X-Line-ChannelSecret": "0e6392a115a2d65089479eb5334de457",
      "X-Line-Trusted-User-With-ACL": "ua9f4a868cf921b7f84075a766320b3ca"
    },
    "method": "POST",
    "body": body
  };

  var proxiedReq = request.defaults({proxy: proxyUrl});

  proxiedReq.post(options, function(err, httpRes, bodyRes){
    if(err){
      console.log(err);
    }
    console.log(bodyRes);
  });
};

exports.text = function(toUser, text){
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
  send(body);
}
exports.image = function(toUser, imageUrl, previewUrl){
  var body = {
  "to":[toUser],
  "toChannel":1383378250,
  "eventType":"138311608800106203",
  "content":{
    "contentType":2,
    "toType":1,
    "originalContentUrl":imageUrl,
    "previewImageUrl":previewUrl
  }
};
body = JSON.stringify(body);
  send(body);
}
exports.sticker = function(toUser){
  var body = {
  "to":[toUser],
  "toChannel":1383378250,
  "eventType":"138311608800106203",
  "content":{
    "contentType":8,
    "toType":1,
    "contentMetadata":{
      "STKID":"3",
      "STKPKGID":"332",
      "STKVER":"100"
    }
  }
};
body = JSON.stringify(body);
send(body);
}
