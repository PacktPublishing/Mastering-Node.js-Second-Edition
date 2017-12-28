'use strict';

// Stores all clients:
// key: web socket object
// val: state [one of 'available' | '+aphonenumber']
//
let clients = new Map();

module.exports = {
	
	nextAvailable: sock => {
		let iter = clients.entries();
		let arr;
		while(arr = iter.next().value) {
			if(arr[1] === 'available') {
				return arr[0];
			}
		}
	},
	
	withNumber: number => {
		let iter = clients.entries();
		let arr;
		while(arr = iter.next().value) {
			if(arr[1] === number) {
				return arr[0];
			}
		}	
	},
	
	get: sock => clients.get(sock),
	set: (sock, status) => clients.set(sock, status),
	delete: sock => clients.delete(sock)
};