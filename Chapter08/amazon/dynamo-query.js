const events = require('events');
const util = require('util');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

const db = new AWS.DynamoDB(); 

db.getItem({
	TableName : "purchases",
	Key : {
		Id : {
			"N"		: "124"
		},
		Date : {
			"N"		: "1375314738467"
		}
	},
	AttributesToGet : [
		"Action", 
		"Cart"
	]
}, (err, res) => {
	console.log(util.inspect(res, {
		depth: 10
	}));
});

