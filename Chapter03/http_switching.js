const http = require('http');
const server = new http.Server();

server.on('connection', socket => {
	let now = new Date();
	console.log(`Client arrived: ${now}`);
	socket.on('end', () => console.log(`client left: ${new Date()}`));
});

server.on('request', (request, response) => {
	request.setEncoding('utf8');
	request.on('readable', () => {
		let data = request.read();
		data && response.end(data);
	});
});

// Connections get 2 seconds before being terminated
server.setTimeout(2000, socket => socket.end());
server.listen(8080);