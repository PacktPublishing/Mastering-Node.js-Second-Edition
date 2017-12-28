var cluster	= require('cluster');
var http 	= require('http');
var numCPUs = require('os').cpus().length;

if(cluster.isMaster) {
	for(var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
}

if(cluster.isWorker) {
	http.createServer(function(req, res) {
		res.writeHead(200);
		res.end("Hello from " + cluster.worker.id);
	}).listen(8080);
}