const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');

const S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

let body = JSON.stringify({ foo: "bar" });
let s3Obj = {
	Key						: 'demos/putObject/first.json',
	Body					: body,
	ServerSideEncryption	: "AES256",
	ContentType				: "application/json",
	ContentLength			: body.length,
	ACL						: "private"
};

S3.putObject(s3Obj, (err, data) => {
	if(err) {
		throw err;
	} 
	
	console.log(data);
});
