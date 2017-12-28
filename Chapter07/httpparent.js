var fork = require('child_process').fork;
var net = require('net');

var children = [];

require('os').cpus().forEach(function(f, idx) {
	children.push(fork("./httpchild.js", [idx]));
});

net.createServer(function(socket) { 
	var rand = Math.floor(Math.random() * children.length);
	children[rand].send(null, socket);	
}).listen(8080);
