"use strict";

const through2 = require('through2');
const sentiment = require('sentiment');

module.exports = targProp => {

	if(typeof targProp !== 'string') {
		targProp = 'sentiment';
	}

	return through2.obj(function(chunk, enc, callback) {
	
		// Add #sentiment property
		//
		let score = sentiment(chunk[targProp]).score;
		
		// Negative sentiments
		//
		if(score < 0) {
			chunk.sentiment = score < -4 ? 'devil' : 'unhappy';
		}
		
		// Positive sentiments
		//
		else if(score >= 0) {
			chunk.sentiment = score > 4 ? 'wink' : 'happy';
		}
		
		this.push(chunk);
	
		callback()
	});
};