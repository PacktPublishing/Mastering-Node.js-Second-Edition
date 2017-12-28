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

	let requestedFile = request.url.substring(1);

	S3.headObject({
		Key : requestedFile
	}, (err, data) => {
	
		//	404, etc.
		//
		if(err) {
			response.writeHead(err.statusCode);
			return response.end(err.name);
		}
		
		response.writeHead(200, {
			"Last-Modified" 	: data.LastModified,
			"Content-Length" 	: data.ContentLength,
			"Content-Type" 		: data.ContentType,
			"ETag" 				: data.ETag
		});

		S3.getObject({
			Key	: requestedFile
		}).createReadStream().pipe(response);
	});
}).listen(8080);
