const stream = require("stream");
const net = require("net");

net.createServer(socket => {
	socket.write("Go ahead and type something!");
	socket.setEncoding("utf8");
	socket.on("readable", function() {
		process.stdout.write(this.read())
	});
})
.listen(8080);