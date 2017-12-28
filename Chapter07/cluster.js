var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

cluster.setupMaster({
	exec	: "worker.js",
	args 	: ["--use", "http"],
	silent	: false
});

if(cluster.isMaster) {

	var i;
	var workerObj;
	
	for(i=0; i < numCPUs; i++) {
		workerObj = cluster.fork({
			
		});
	}
	
	cluster
	.on('fork', function(worker) {
		//console.log("forked: " + worker.id);
	})
	.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	})
	.on('disconnect', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' disconnected');
	})
	.on('online', function(worker) {
		console.log(worker.id + " is online!")
	})
	.on('listening', function(worker, address) {
		address.fd = address.fd || worker.process._channel.fd;
		address.id = worker.id;
		address.uniqueID = worker.uniqueID;
		address.workerID = worker.workerID;
		worker.send({
			data: "You are worker " + worker.id
		});
	});
	
	//	Receive messages from workers
	//
	Object.keys(cluster.workers).forEach(function(id) {
		cluster.workers[id].on('message', function(msg) {
			console.log("GOT A MESSAGE: ");
			console.log(msg.data);
			console.log("FROM : " + this.id);
		});
	});
} 