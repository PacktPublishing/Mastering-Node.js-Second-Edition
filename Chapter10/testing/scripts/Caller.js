const http = require('http');

module.exports = function() {
	this.makeCall = (url, cb) => {
		http.get(url, res => {
			cb(this.parseResponse(res));
		});
	};
	this.parseResponse = res => {
		if(!res.statusCode) {
			throw new Error('No status code present');
		}
		switch(res.statusCode) {
			case 200:
				return 'handled';
			break;
			case 404:
				return 'handled';
			break;
			default:
				return 'not handled';
			break;
		}
	}
};