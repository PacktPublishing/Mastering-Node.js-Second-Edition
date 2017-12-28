'use strict';

let WebSocket = require('ws');
let SServer = WebSocket.Server;

let arrayToStream = require('./transformers/arrayToStream.js');
let timeTransformer = require('./transformers/time.js');
let sentimentTransformer = require('./transformers/sentiment.js');
let accumulator = require('./transformers/accumulator.js');

let sbUrl = process.env.SWITCHBOARD_URL;

module.exports = server => {

	// Bind the local socket server, which communicates
	// with web clients.
	//
	(new SServer({
		server: server
	})).on('connection', localClientSS => {
	
		let keepalive;
		
		// A remote SMS gateway
		//
		let switchboard = new WebSocket(sbUrl);
	
		switchboard.onopen = () => {
		
			console.log(`Switchboard connected: ${sbUrl}`);
			
			// This is necessary for some hosts, which will terminate
			// idle socket connections. Just ping to keep alive (20sec).
			//
			(function $ping() {
				switchboard.ping();
				keepalive = setTimeout($ping, 20000);
			})();
		};
		
		switchboard.on('pong', () => {
			console.log(`got pong`);
			// Do something re: switchboard unavailability if pong
			// not received after x seconds...
			//
		});
		
		switchboard.onmessage = event => {
	
			let data = event.data;
	
			try {
				data = JSON.parse(data);
			} catch(e) {
				return console.log(`Unable to process data: ${data}`);
			}
			
			if(data.type === 'alert') {
				return console.log(data.text);
			}
	
			if(data.type === 'update') {

				console.log(`got update: ${data}`);

				// Transform messages into expected format for UI.
				// Note that we reverse (latest first).
				// Data ultimately .setState on React component.
				//
				arrayToStream(data.list.reverse())
				.pipe(timeTransformer({
					format: "%s ago"
				}))
				.pipe(sentimentTransformer('message'))
				.pipe(accumulator((err, messages) => {
					if(err) {
						// Hmm....
						//
						return console.log(err);
					}
					localClientSS.sendMessage({
						messages: messages,
						phone: messages[0].phoneNumber
					})
				}));
			}
		};

		// Need to configure handlers so we can bidirectionally
		// communicate with client UI (snd/rcv messages)
		//
		localClientSS.sendMessage = obj => {

			console.log("TRYING TO SEND:", obj);

			localClientSS.send(JSON.stringify(obj));
		};

		// Client sent a response
		//
		localClientSS.on('message', payload => {

			try {
				payload = JSON.parse(payload);
			} catch(e) {
				return;
			}

			switch(payload.command) {

				case 'response':
					switchboard.send(JSON.stringify({
						type: 'response',
						message : payload.message
					}));
				break;

				default:
					// do nothing
				break;
			}
		});

		// When UI client disconnects need to close switchboard connection
		// and the keepalive ping
		//
		localClientSS.on('close', () => {
			clearTimeout(keepalive);
			switchboard.close();
			switchboard = null;
		});
	});
	
	console.log(`Client socket server is ready.`);
};