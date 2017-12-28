const http = require('http');

http.createServer((request, response) => {
	response.writeHeader(200, {"Content-Type": "text/plain"});  
    response.write("Hello World");  
    response.end();  
}).listen(2112)
