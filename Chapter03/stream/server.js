const http = require('http');
const url = require('url');
const jsdom = require('jsdom/lib/old-api.js');
const spawn = require('child_process').spawn;
const fs = require('fs');
const stream = require('stream');
let width = 200;
let height = 200;

var writer = (request, response) => {

  	if(request.url === '/favicon.ico') {
  		response.writeHead(200, {
  			'Content-Type': 'image/x-icon'
  		});
  		return response.end();
  	}
  	
	let values = url.parse(request.url, true).query['values'].split(",");
  	let cacheKey = values.sort().join('.');
 	
  	fs.exists(cacheKey, exists => {
  	
  		response.writeHead(200, {
  			'Content-Type': 'image/png'
  		});
  	
  		if(exists) {
  			fs.createReadStream(cacheKey)
  			.on('readable', function() {
  				let chunk;
  				while(chunk = this.read()) {
  					response.write(chunk);
  				}
  			})
  			.on('end', () => response.end());
  			
  			return;
  		}
  		
		jsdom.env({
			features: {
				QuerySelector : true
			}, 
			html : `<!DOCTYPE html><div id="pie" style="width:${width}px;height:${height}px;"></div>`,
			scripts : ['d3.min.js','d3.layout.min.js','pie.js'],
			done : (err, window) => {
			
				let svg = window.insertPie("#pie", width, height, values).innerHTML;
				let svgToPng = spawn("convert", ["svg:", "png:-"]);
				let filewriter = fs.createWriteStream(cacheKey);
				
				filewriter.on("open", err => {
				
					let streamer = new stream.Transform();
					
					streamer._transform = function(data, enc, cb) {
						filewriter.write(data);
						this.push(data);
						cb();
					};
		
					svgToPng.stdout.pipe(streamer).pipe(response);
					svgToPng.stdout.on('finish', () => response.end());
					
					// jsdom's domToHTML will lowercase element names
					svg = svg.replace(/radialgradient/g,'radialGradient');
					
					svgToPng.stdin.write(svg);
					svgToPng.stdin.end();
					
					window.close();
				});
			}
		});  		
  	})
}

http.createServer(writer).listen(8080);