const stream = require('stream');
let converter = new stream.Transform();

converter._transform = function(num, encoding, cb) {
	this.push(String.fromCharCode(new Number(num)) + "\n");
	cb();
};

process.stdin.pipe(converter).pipe(process.stdout);

