const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer(function(request, response) {

	var parsedURL = url.parse(request.url, true);
	var pathname = parsedURL.pathname;
	var args = pathname.split("/");
	var method = args[1];
  
  	if(method === "login") {

		response.writeHead(200, {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			"Connection": "keep-alive"
		});
		
		response.write(":" + Array(2049).join(" ") + "\n");
		response.write("retry: 2000\n");

		response.on("close", function() {
			console.log("client disconnected");
		});

		setInterval(function() {
			response.write("data: " + new Date() + "\n\n");
		}, 1000);
		
		return;
	}
	
	if(method = "client") {
		fs.createReadStream("./min_client.html").pipe(response);
	}
	
}).listen(2112);