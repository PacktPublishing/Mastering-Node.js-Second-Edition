const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

const S3 = new AWS.S3();

S3.createBucket({
	Bucket: 'nodejs-book'
}, (err, data) => {
	if(err) {
		throw err;
	}
	
	console.log(data);
});