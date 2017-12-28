const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const _ = require('lodash');

http.createServer((request, response) => {
	let parse = url.parse(request.url, true);
	let symbol = parse.query.symbol;
	
	if(request.url === '/favicon.ico') {
		response.writeHead(200, {
			'Content-Type': 'image/x-icon'
		});
		return response.end();
	}
	
	if(!symbol) {
		return fs.readFile('./stocks.html', (err, data) => {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	}

	query = `https://api.iextrading.com/1.0/stock/${symbol.toLowerCase()}/quote`;

	https.get(query, res => {

		let data = "";

		res
		.on('readable', function() {
			let d;
			while(d = this.read()) {
				data += d.toString();
			}
		})
		.on('end', function() {
		
			let out = {};
			
			try {
				data = JSON.parse(data);
				out.quote = data;
				out.callIn = 5000;

				Object.keys(out.quote).forEach(k => {
					// Creating artificial change (random)
					// Normally, the data source would change regularly.
					v = out.quote[k];
					if(_.isFinite(v)) {
						out.quote[k] = +v + Math.round(Math.random());
					}
				})
				
			} catch(e) {
				out = {
					error: "Received empty data set",
					callIn: 10000
				};
			}
		
			response.writeHead(200, {
				"Content-type" : "application/json"
			});
			response.end(JSON.stringify(out));
		});
	}).on('error', err => {
		response.writeHead(200, {
			"Content-type" : "application/json"
		});
		response.end(JSON.stringify({
			error: err.message,
			callIn: null
		}));
	});
}).listen(2112);