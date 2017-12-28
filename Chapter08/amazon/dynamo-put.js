const events = require('events');
const util = require('util');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

const db = new AWS.DynamoDB(); 

db.putItem({
	TableName : "purchases",
	Item : {
		Id : {
			"N"		: "125"
		},                                       
		Date : {
			"N" 	: "1375314738478"
		},
		UserId 	: {
			"S" : "DD9EDG8890"
		},
		Cart 	: {
			"SS" : [ "song14", "song63" ]
		},
		Action 	: {
			"S" : "buy"
		}
	}
}, () => console.log(arguments));

