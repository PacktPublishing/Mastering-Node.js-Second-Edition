'use strict';

module.exports = (db, Clients) => {

	const dbStream = require('level-live-stream')(db);
	
	// We need to be notified when a new message has been
	// added.
	//
	dbStream.on('data', data => {
	
		let number = data.key;
		let val = data.value;
		let type = data.type; // typically `put`
		
		// Find any clients that are listening on this number
		//
		let boundClient = Clients.withNumber(number);
		
		// Send the current history to this client
		//
		if(boundClient) {
		
			console.log("Client with existing number getting messages");

			try {
				return boundClient.send(JSON.stringify({
					type: 'update',
					list: val
				}));
			} catch(e) {
				Clients.delete(boundClient);
			}
		}
		
		// Try to find an available client to handle this number
		//
		let waitingClient = Clients.nextAvailable();

		if(waitingClient) {

			console.log("Client assigned a number");

			// This client is no longer `available`. Assign client a number.
			// Then send number history.
			//
			Clients.set(waitingClient, number);
		
			waitingClient.send(JSON.stringify({
				type: 'update',
				list: val
			}));
		}
		
		// Getting here means a message cannot be handled at this time.
		// We need to create a pending queue of some sort here,
		// that can be picked up as soon as a new client arrives or
		// otherwise becomes available.
		//
	});
	dbStream.on('error', err => console.log("STREAMERROR:", err));
};