const events = require('events');
const util = require('util');
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../config.json');

const db = new AWS.DynamoDB(); 

db.createTable({
	TableName: 'purchases',
	AttributeDefinitions : [{
		AttributeName : "Id",
		AttributeType : "N"
	}, {
		AttributeName : "Date",
		AttributeType : "N"
	}],
	KeySchema: [{ 
		AttributeName: 'Id', 
		KeyType: 'HASH' 
	}, { 
		AttributeName: 'Date', 
		KeyType: 'RANGE' 
	}],
	ProvisionedThroughput: {
		ReadCapacityUnits: 2,
		WriteCapacityUnits: 2
	}
}, (err, data) => {
	console.log(util.inspect(data, {
		depth: 10
	}));
});

db.listTables({}, () => console.log(arguments));
