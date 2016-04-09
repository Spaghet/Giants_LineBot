var https = require('http');

const PORT = process.env.PORT || 5000;

var handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event.body, null, 2));
    var msg = event.body.result[0];
    var data = JSON.stringify({
      to: [msg.content.from.toString()],
      toChannel: 1383378250,
      eventType: "138311608800106203",
      content: msg.content
    });
    var url ='https://trialbot-api.line.me/v1/events';
    var opts = {
        host: 'trialbot-api.line.me',
        path: '/v1/events',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-Line-ChannelID": "1462997838",
            "X-Line-ChannelSecret": "0e6392a115a2d65089479eb5334de457",
            "X-Line-Trusted-User-With-ACL": "ua9f4a868cf921b7f84075a766320b3ca"
        },
        method: 'POST'
    }
    var req = https.request(opts, function(res){
        res.on('data', function(chunk){
            console.log(chunk.toString())
        }).on('error', function(e){
            console.log('ERROR: '+ e.stack);
        })
    })
    req.write(data)
    req.end();
};

https.createServer(handler).listen(PORT);
