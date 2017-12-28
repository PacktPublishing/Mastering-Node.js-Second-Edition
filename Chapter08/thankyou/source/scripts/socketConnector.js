'use strict';

// Lose any :port that may exist in the host
//
let host = window.document.location.host.replace(/:.*/, '');

// The client components use this socket to communicate with switchboard
//
let ws = new WebSocket('ws://' + host + ':8080');

// Add #sendMessage method, used by MessageComposer
//
ws.sendMessage = function(command, msg) {
	this.send(JSON.stringify({
		command : command || '',
		message : msg || ''
	}));
};