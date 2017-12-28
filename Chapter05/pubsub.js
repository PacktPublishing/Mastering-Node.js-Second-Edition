const redis = require("redis");
const receiver = redis.createClient();
const publisher = redis.createClient();

receiver.subscribe("firehose");
receiver.on("message", (channel, message) => {
    console.log(`Received message: ${message} on channel: ${channel}`);
});

setTimeout(function() {
	publisher.publish('firehose', 'Hello!');
}, 1000);
