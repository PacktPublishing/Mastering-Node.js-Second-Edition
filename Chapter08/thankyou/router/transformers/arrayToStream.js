'use strict';

const stream = require('stream');
const util = require('util');

// Convert an Array to a Readable stream.
// Note that stream is always in object mode.
//
module.exports = arr => {

	if(!Array.isArray(arr)) {
		throw new TypeError('Non-array passed to arrayToStream module');
	}

	let Readable = stream.Readable;
	
	let ReadableStream = function() {
		Readable.call(this, {
			objectMode: true
		});
		this.arr = arr;
		this.idx = 0;
	};
	
	util.inherits(ReadableStream, Readable);
	
	ReadableStream.prototype._read = function() {
		if(this.idx === this.arr.length) {
			return this.push(null);
		}
		this.push(this.arr[this.idx++]);
	};
	
	return new ReadableStream;
};