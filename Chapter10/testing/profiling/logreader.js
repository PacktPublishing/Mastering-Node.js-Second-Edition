const fs = require('fs');
const stream = require('stream');
let lineReader = new stream.Transform({
	objectMode: true
});
 
lineReader._transform = function $transform(chunk, encoding, done) {
	let data = chunk.toString();
	if(this._lastLine) {
		data = this._lastLine + data;
	}
	let lines = data.split('\n');
	this._lastLine = lines.pop();
	lines.forEach(line => this.push(line));
	done();
};
 
lineReader._flush = function $flush(done) {
     if(this._lastLine) {
     	this.push(this._lastLine);
     }
     this._lastLine = null;
     done();
};
 
lineReader.on('readable', function $reader() {
	let line;
	while(line = this.read()) {
		console.log(line);
	}
});

fs.createReadStream('./dummy.log').pipe(lineReader);
