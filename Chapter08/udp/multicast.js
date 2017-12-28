const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const multicastAddress = '230.1.2.3';
const multicastPort = 5554;

socket.bind(multicastPort);

socket.on("listening", function() {
    this.setMulticastTTL(64);
    this.addMembership(multicastAddress);
});

let cnt = 1;
let sender;

(sender = () => {
	let msg = Buffer.from(`This is message #${cnt}`);
	socket.send(
		msg,
		0,
		msg.length,
		multicastPort,
		multicastAddress
	);
	
	++cnt;
	
	setTimeout(sender, 1000);
})();

dgram.createSocket('udp4')
.on('message', (message, remote) => {
    console.log(`Client1 received message ${message} from ${remote.address}:${remote.port}`);
})
.bind(multicastPort, multicastAddress);

dgram.createSocket('udp4')
.on('message', (message, remote) => {
	console.log(`Client2 received message ${message} from ${remote.address}:${remote.port}`);
})
.bind(multicastPort, multicastAddress);


