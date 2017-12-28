const amqp = require('amqp');
const consumer = amqp.createConnection({ host: 'localhost', port: 5672 });

consumer.on('ready', () => {
	
	// When all 3 queues are ready, publish.
	let cnt = 3;
	let queueReady = () => {
		if(--cnt > 0) {
			return;
		}
		exchange.publish("animals.dogs.poodles", "Poodle!");
		exchange.publish("animals.dogs.dachshund", "Dachshund!");
		exchange.publish("animals.cats.shorthaired", "Shorthaired Cat!");
		exchange.publish("animals.dogs.shorthaired", "Shorthaired Dog!");
		exchange.publish("animals.misc", "Misc!");
	};
	
	let exchange = consumer.exchange('topical', {type: "topic"});
	
	consumer.queue('queue-1', q => {

		q.bind(exchange, 'animals.*.shorthaired');
		q.subscribe(message => {
			console.log('animals.*.shorthaired -> ' + message.data.toString('utf8'));
		});
		
		queueReady();
	});

	consumer.queue('queue-2', q => {
		q.bind(exchange, '#');
		q.subscribe(message => {
			console.log('# -> ' + message.data.toString('utf8'));
		});
		
		queueReady();
	});

	consumer.queue('queue-3', q => {
		q.bind(exchange, '*.cats.*');
		q.subscribe(message => {
			console.log('*.cats.* -> ' + message.data.toString('utf8'));
		});
		
		queueReady();
	});
});

//	# -> Poodle!
//	animals.*.shorthaired -> Shorthaired Cat!
//	*.cats.* -> Shorthaired Cat!
//	# -> Dachshund!
//	# -> Shorthaired Cat!
//	animals.*.shorthaired -> Shorthaired Dog!
//	# -> Shorthaired Dog!
//	# -> Misc!

