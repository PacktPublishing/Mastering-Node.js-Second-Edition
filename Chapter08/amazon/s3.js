const AWS = require('aws-sdk');

// You should change this to something unique. AWS bucket names must
// be unique and are shared across ALL USER namespaces.
const bucketName = 'nodejs-book';

AWS.config.loadFromPath('../config.json');

const S3 = new AWS.S3();

S3.createBucket({
	Bucket: bucketName
}, (err, data) => {
	if(err) {
		throw err;
	}
	
	console.log(data);
});


