const amqp = require('amqp');
const consumer = amqp.createConnection({ host: 'localhost', port: 5672 });

consumer.on('error', err => {
	console.log(err);
});

consumer.on('ready', () => {
	let exchange = consumer.exchange('node-topic-exchange', {type: "topic"});
	consumer.queue('node-topic-queue', q => {

		q.bind(exchange, '#');

		q.subscribe(message => {
			// Messages are buffers
			console.log(message.data.toString('utf8'));
		});
		
		exchange.publish("some-topic", "Hello!");
	});
});


