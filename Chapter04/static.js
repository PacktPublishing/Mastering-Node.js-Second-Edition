const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const crypto = require('crypto');

http.createServer((request, response) => {

	let rm = request.method.toLowerCase();
	
	if(rm === "post") {

		let form = new formidable.IncomingForm();
		form.uploadDir = process.cwd();
		let resp = '';

		form
		.on("file", (field, File) => {
			resp += `File: ${File.name}<br />`;
		})
		.on("field", (field, value) => {
			resp += `${field}: ${value}<br />`;;
		})
		.on("end", () => {
			response.writeHead(200, {'content-type': 'text/html'});
			response.end(resp);
		})
		.parse(request);
		
		return;
	}
	
	// We can only handle GET requests at this point
	
	if(rm !== "get") {
		return response.end("Unsupported method");
	}
	
	let filename = path.join(__dirname, request.url);
    	
	fs.stat(filename, (err, stat) => {
	
    	if(err) {
    		response.statusCode = err.errno === 34 ? 404 : 500;
			return response.end()
    	} 

		let etag = crypto.createHash('md5').update(stat.size + stat.mtime).digest('hex');
					
		response.setHeader('Last-Modified', stat.mtime);

		if(request.headers['if-none-match'] === etag) {
			response.statusCode = 304;
			return response.end();
		}

		response.setHeader('Content-Length', stat.size);
		response.setHeader('ETag', etag);
		response.statusCode = 200;
		
		fs.createReadStream(filename).pipe(response);
	});

}).listen(8000);
