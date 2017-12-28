'use strict';

const util = require('util');
const through2 = require('through2');
const moment = require('moment');

module.exports = opts => {

	opts = opts || {};

	let range = ~[
		'milliseconds',
		'seconds',
		'minutes',
		'hours'
	].indexOf(opts.range) ? opts.range : "milliseconds";
	
	let format = opts.format || "%s";

	return through2.obj(function(chunk, enc, callback) {
	
		// Convert to human readable date
		//
		let now = Date.now();
		let delta = now - +chunk.received;

		let conv = moment
			.duration(delta, range)
			.humanize();
			
		chunk.date = util.format(format, conv);
		
		this.push(chunk);
	
		callback()
	});
};