'use strict';

const restify = require('restify');
const SServer = require("ws").Server;
const npmpack = require('../package.json');

// Add in the client mapping API (who needs work, who is working...)
//
let Clients = require('./clientMap.js');

const server = restify.createServer({
	name: npmpack.name,
	version: npmpack.version
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());

function responder(req, res) {
	res.send(200, 'Switchboard is active');
}

server.get('/', responder);

// process.env.PORT is set by heroku (add it yourself if hosting elsewhere)
//
server.listen(process.env.PORT, () => {});

// Get the LevelDB interface, and its readable stream
//
require('./Db')((db, dbApi) => {

	// Configure the sms webhook routing
	//
	require('./sms')(server, dbApi);
	
	// Configure a leveldb datastream listener which has the job
	// of informing clients of data changes.
	//
	require('./dataStream.js')(db, Clients);
	
	// Configure the socket listener for client connections
	//
	let wss = new SServer(server);
	
	wss.on("connection", clientConn => {
		
		console.log("websocket connection opened.")
				
		clientConn.on("close", () => {
			console.log("websocket connection closed.");
			
			// Remove client from system
			//
			Clients.delete(clientConn);
			
			clientConn = null;
		});
		
		clientConn.on("message", payload => {
		
			console.log("Got message from client server: ", payload);
			
			try {
				payload = JSON.parse(payload);
			} catch(e) {
				return;
			}
			
			switch(payload.type) {
				case 'available':
				
					// This connection wants new work
					//
					Client.set(clientConn, 'available');
				
				break;
				
				case 'response':
					let number = Clients.get(clientConn);
					
					// Add to message history when bound client
					// sends valid message to a known number.
					// 
					if(/^\+?[0-9]*$/.test(number)) {
						dbApi.addToNumberHistory(number, {
							message 	: payload.message,
							received	: Date.now(),
							phoneNumber	: number
						})
						.then(() => require('./sms/sendResponse.js')(number, payload.message))
						.catch(err => console.log("response send error:", err));
					}
				break;
				
				default: 
					// ignore
				break;
			}
		});
		
		// Create a Client entry
		//
		Clients.set(clientConn, 'available');
		
		// Say something nice
		//
		clientConn.send(JSON.stringify({
			type: 'alert',
			text: 'How can I help you?'
		}));
	});
});

