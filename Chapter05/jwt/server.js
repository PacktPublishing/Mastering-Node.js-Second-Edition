const express = require('express');
const multer = require('multer');
const crypto = require('crypto')
const url = require('url')
const jwt = require('jwt-simple');

const app = express();

app.set('jwtSecret', 'shhhhhhhhh');

const server = app.listen(8080, function() {
	console.log('Listening on', server.address().port)
});

app.use(express.static(__dirname));

// This handles multipart form data
app.use(multer())

app.post('/login', auth, function(req, res) {

	let nowSeconds = Math.floor(Date.now()/1000);
	let plus7Days = nowSeconds + (60 * 60 * 24 * 7);
	
	let token = jwt.encode({
		"iss" : "http://blogengine.com", 
		"aud" : ["http://blogsearch.com", "http://blogstorage"],
		"sub" : "blogengine:uniqueuserid",
		"iat" : nowSeconds,
		"exp" : plus7Days,
		"sessionData" : encrypt(JSON.stringify({
			"department" : "sales"
		}))
	}, app.get('jwtSecret'));
	
	res.send({
		token : token
	})
});

app.post('/tokendata', function(req, res) {
	let token = req.get('Authorization').replace('Bearer ', '');
	let decoded = jwt.decode(token, app.get('jwtSecret'));
	decoded.sessionData = JSON.parse(decrypt(decoded.sessionData));
	let now = Math.floor(Date.now()/1000);
	if(now > decoded.exp) {
		return res.end(JSON.stringify({
			error : "Token expired"
		}));
	}
	res.send(decoded)
});


//	Not used for JWT, but for encrypting #sessionData
function encrypt(plaintext){
	let cipher = crypto.createCipher('aes-256-cbc', app.get('jwtSecret'));
	return cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex');
}
 
//	Not used for JWT, but for decrypting #sessionData
function decrypt(encrypted) {
	let decipher = crypto.createDecipher('aes-256-cbc', app.get('jwtSecret'));
	return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

//	A mock auth middleware -- you will need to check real values in a database, or similar
function auth(req, res, next) {
	//	Ensure at least that we got a u/p 
	if(!req.body.username || !req.body.password) {
		return res.end(JSON.stringify({
			error: 'Bad Credentials'
		}), 401);
	} 
	
	next();
}