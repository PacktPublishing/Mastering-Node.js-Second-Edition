const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const redis = require("redis");
const receiver = redis.createClient();
const publisher = redis.createClient();
const app = express();

app.use(cookieParser());

let connections = {};

app.get('/poll', (request, response) => {
	let id = request.cookies.node_poll_id;
	if(!id) {
		return;
	}
	connections[id] = response;
});

app.get('/', (request, response) => {
    fs.readFile('./poll_client.html', (err, data) => {
    	response.cookie('node_poll_id', Math.random().toString(36).substr(2, 9));
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

app.listen(2112);

receiver.subscribe("stdin_message");
receiver.on("message", (channel, message) => {
	let conn;
	for(conn in connections) {
		connections[conn].end(message);
	}
    console.log(`Received message: ${message} on channel: ${channel}`);
});

process.stdin.on('readable', function() {
	let msg = this.read();
	msg && publisher.publish('stdin_message', msg.toString());
});

