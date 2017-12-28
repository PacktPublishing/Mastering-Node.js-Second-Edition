const fs = require('fs');
const http = require('http');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

const S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

S3.deleteObject({
	Bucket 	: 'nodejs-book',
	Key 	: 'demos/putObject/optimism.jpg'
}, (err, data) => {
	// 	...
});

S3.deleteObjects({
	Bucket	: 'nodejs-book',
	Delete	: {
		Objects	: [
			{
				Key	: 'demos/putObject/first.json'
			},
			{
				Key	: 'demos/putObject/testimage2.jpg'
			}
			//	...
		]
	}
}, (err, data) => { 
	//	...
});