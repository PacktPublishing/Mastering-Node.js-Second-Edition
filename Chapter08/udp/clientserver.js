const dgram = require('dgram');
// Create a udp4 socket
const socket = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');
const message = Buffer.from('UDP says Hello!');

// Messages are handled here
socket.on('message', (msg, info) => {
	console.log(`socket got: ${msg} from ${info.address}:${info.port}`);
});

// socket listening on localhost, port 41234.
// Callback is fired once socket is listening.
socket.bind(41234);

socket.on('listening', ()  => console.log('Listening for datagrams.'));

client.send(message, 0, message.length, 41234, "localhost", (err, bytes) => {
	client.close();
});
