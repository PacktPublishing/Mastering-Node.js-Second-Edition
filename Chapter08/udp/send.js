const dgram = require('dgram');
let client = dgram.createSocket("udp4");
let message = process.argv[2] || "message";

message = Buffer.from(message);

client.send(message, 0, message.length, 41234, "localhost");