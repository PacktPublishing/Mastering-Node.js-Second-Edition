const events = require('events');
const util = require('util');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

const db = new AWS.DynamoDB();

db.scan({
	TableName : "purchases",
	ScanFilter : {
		"Date": {
			"AttributeValueList" : [
				{
					"N" : "1375314738467"
				}
			],
			"ComparisonOperator" : "EQ"
		},
	  	"Cart": {
	  		"AttributeValueList" : [
	  			{
	  				"S" : "song2"
	  			}
	  		],
	    	"ComparisonOperator" : "CONTAINS"
	    },
	}
}, (err, res) => {
	console.log(util.inspect(res, {
		depth: 10
	}));
});

