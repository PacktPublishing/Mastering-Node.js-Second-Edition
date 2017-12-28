const stream = require('stream');

let Feed = function(channel) {
	let readable = new stream.Readable({});
	let news = 'A long headline might go here';
	readable._read = () => {
		readable.push(news);
		readable.push(null);
	};
	return readable;
};

let feed = new Feed();

feed.on('readable', () => {
	let character;
	while(character = feed.read(1)) {
		console.log(character.toString());
	}
});

feed.on('end', function() {
	console.log('No more bytes to read');
});