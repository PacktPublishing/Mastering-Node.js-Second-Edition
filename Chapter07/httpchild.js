var id = process.argv[2];
console.log("Server " + id + " started");
process.on('message', function(n, socket) {
	socket.write('child ' + id + ' was your server today.\r\n');
	socket.end();
});

