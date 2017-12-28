const http = require('http');
const sstatic = require('node-static');
const fileServer = new sstatic.Server();

const app = http.createServer((request, response) => {
	fileServer.serve(request, response);
});
const io = require('socket.io').listen(app, { log: false });

app.listen(2112);

io.sockets.on('connection', socket => {
	let id = socket.id;

	socket.on('mousemove', data => {
		data.id = id;
		socket.broadcast.emit('moving', data);
	});
	
	socket.on('disconnect', () => {
		socket.broadcast.emit('clientdisconnect', id);
	});
});