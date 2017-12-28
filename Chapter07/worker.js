var http = require('http');

    process.on('message', function(msg) {
    	console.log("Worker got message: " + msg.data);
    });

var wm = new WeakMap;
//console.log(process.argv);

  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("ok\n");
     // notify master about the request
    process.send({data: "yay!"});
  }).listen(8000);