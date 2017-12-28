const stream = require('stream');

let writable = new stream.Writable({
	highWaterMark: 10
});

writable._write = (chunk, encoding, callback) => {
	process.stdout.write(chunk);
	callback();
};

function writeData(iterations, writer, data, encoding, cb) {
	(function write() {

		if(!iterations--) {
			return cb()
		}

		if (!writer.write(data, encoding)) {
			console.log(` <wait> highWaterMark of ${writable.writableHighWaterMark} reached`);
			writer.once('drain', write);
		}
	})()
}

writeData(4, writable, 'String longer than highWaterMark', 'utf8', () => console.log('finished'));



