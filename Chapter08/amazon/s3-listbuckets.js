const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

const S3 = new AWS.S3();

S3.listBuckets((err, data) => {
	console.log(data.Buckets);
});
