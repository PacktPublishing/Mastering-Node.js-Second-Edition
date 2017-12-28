const http = require('http');
const redis = require("redis");
const client = redis.createClient();
 
http.createServer(function(req, res) {

	let auth = req.headers['authorization']; 
	if(!auth) {   
		res.writeHead(401, {'WWW-Authenticate': 'Basic realm="Secure Area"'});
		return res.end('<html><body>Please enter some credentials.</body></html>');
	}

	let tmp = auth.split(' ');   
	let buf = Buffer.from(tmp[1], 'base64');
	let plain_auth = buf.toString();   
	let creds = plain_auth.split(':'); 
	let username = creds[0];

	//	Find this user record
	//
	client.get(username, function(err, data) {
		if(err || !data) {
			res.writeHead(401, {'WWW-Authenticate': 'Basic realm="Secure Area"'});
			return res.end('<html><body>You are not authorized.</body></html>');
		}
		
		res.statusCode = 200;
		res.end('<html><body>Welcome!</body></html>');
	});
}).listen(8080);


 