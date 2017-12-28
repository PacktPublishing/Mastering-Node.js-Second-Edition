const redis = require("redis");
const receiver = redis.createClient();
const publisher = redis.createClient();

let connections = {};

receiver.subscribe('stdin_message');
receiver.on('message', (channel, message) => {
    let conn;
    for (conn in connections) {
        connections[conn].end(message);
    }
    console.log(`Received message: ${message} on channel: ${channel}`);
});
process.stdin.on('readable', function() {
    let msg = this.read();
    msg && publisher.publish('stdin_message', msg.toString());
});