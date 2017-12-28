const http = require('http');
http.createServer((req, resp) => {
	if(req.url === "/") {
		resp.writeHead(200, {
			'content-type' : 'text/plain'
		});
		return resp.end("Hello World!?");
	}
	resp.end();
}).listen(8080);
