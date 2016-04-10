var https = require('https');
var request = require('request');
var CONST = require('./const').const;

const proxyUrl = process.env.FIXIE_URL || 	"http://fixie:qO8t5jn6Ahvz6ly@velodrome.usefixie.com:80";


function send(body){
  var options = {
    "url": "https://trialbot-api.line.me/v1/events",
    "headers": {
      "Content-type": "application/json; charset=UTF-8",
      "X-Line-ChannelID": CONST.bot.channelId,
      "X-Line-ChannelSecret": CONST.bot.channelSecret,
      "X-Line-Trusted-User-With-ACL": CONST.bot.mid
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
    "toChannel": CONST.toChannel,
    "eventType": CONST.eventType.singleMessage,
    "content": {
        "toType": 1,
        "contentType": CONST.contentType.text,
        "text": text
      }
  });
  send(body);
}
exports.image = function(toUser, imageUrl, previewUrl){
  var body = {
  "to":[toUser],
  "toChannel":CONST.toChannel,
  "eventType":CONST.eventType.singleMessage,
  "content":{
    "contentType":CONST.contentType.image,
    "toType":1,
    "originalContentUrl":imageUrl,
    "previewImageUrl":previewUrl
  }
};
body = JSON.stringify(body);
  send(body);
}
exports.sticker = function(toUser, stkID){
  if(!stkID){
    stkID = "1";
  }
  var body = {
  "to":[toUser],
  "toChannel":CONST.toChannel,
  "eventType":CONST.eventType.singleMessage,
  "content":{
    "contentType":CONST.contentType.sticker,
    "toType":1,
    "contentMetadata":{
      "STKID":stkID,
      "STKPKGID":"1",
      "STKVER":"100"
    }
  }
};
body = JSON.stringify(body);
send(body);
}
