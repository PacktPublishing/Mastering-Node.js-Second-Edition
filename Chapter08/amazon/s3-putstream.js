const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath('../config.json');

const S3 = new AWS.S3({
	params: {
		Bucket: 'nodejs-book'
	}
});

fs.stat("./testimage.jpg", (err, stat) => {

	let s3Obj = {
		Key				: 'demos/putObject/testimage.jpg',
		Body			: fs.createReadStream("./testimage.jpg"),
		ContentLength	: stat.size,
		ContentType		: "image/jpeg",
		ACL				: "public-read"
	};
	
	S3.putObject(s3Obj, (err, data) => {
		if(err) {
			throw err;
		}
		console.log(data);
	});
});
