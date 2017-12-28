const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const app = express();
const redis = require("redis");
const client = redis.createClient();

app.get('/authenticate/:username', function(request, response){
	let publicKey = Math.random();
	let username = request.params.username; // This is always "jack"
	
	// ... get jack's data from redis
	client.hgetall(username, (err, data) => {
		if(err || !data) {
			return response.end("no data");
		}
		//	Jack's password is always "beanstalk"
		let challenge = crypto.createHash('sha256').update(publicKey + data.password).digest('hex');

		//	Store challenge for later match
		client.set(challenge, username);
		
		response.end(challenge);
	});
});

app.get('/login/:response', (request, response) => {
	let hash = request.params.response;
  	client.exists(hash, function(err, exists) {
  		if(err || !exists) {
  			return response.end("failed");
  		}
  	});
  
  	client.del(hash, () => response.end("OK"));
});

app.get('/', (request, response) => {
    fs.readFile('./challenge_response.html', (err, data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});

app.get('/256', (request, response) => {
    fs.readFile('./sha256.js', (err, data) => {
        response.end(data);
    });
});

app.listen(8080);


