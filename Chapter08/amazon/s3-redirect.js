const fs = require('fs');
const http = require('http');

const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

const S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

http.createServer((request, response) => {

	S3.headObject({
		Key : request.url
	}, (err, data) => {

		if(err) {
			//	...
		}

		response.writeHead(302, {
		  'Location': `https://s3.amazonaws.com/nodejs-book${request.url}`
		});
		response.end();
	});
}).listen(2112);


