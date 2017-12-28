const http = require('http');

http.request({ 
	host: 'www.example.org',
	method: 'GET',
	path: "/"
}, function(response) {
	response.setEncoding("utf8");
	response.on("readable", () => console.log(response.read()));
}).end();

