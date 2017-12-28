const formidable = require('formidable');
const http = require('http');

http.createServer((request, response) => {
	var rm = request.method.toLowerCase();
	if(request.url === '/uploads' && rm === 'post') {
	
		let form = new formidable.IncomingForm();
		form.uploadDir = process.cwd();
		
		let resp = '';
		
		form
		.on("file", (field, file) => {
			resp += `File : ${file.name}<br />`;
		})
		.on("field", (field, value) => {
			resp += `${field} : ${value}<br />`;
		})
		.on("end", () => {
			response.writeHead(200, {'content-type': 'text/html'});
			response.end(resp);
		})
		.parse(request);
		
		return;
	}

  // show a file upload form
  response.writeHead(200, {'content-type': 'text/html'});
  response.end(
    `<form action="/uploads" enctype="multipart/form-data" method="post">
    <input type="text" name="title"><br>
    <input type="file" name="upload" multiple="multiple"><br>
    <input type="submit" value="Upload">
    </form>`
  );

}).listen(8000);

/*
{ 
	fields: { 
		title: 'Some title' 
	},
  	files: { 
  		upload: { 
			size: 138603,
			path: '/currentDirectory/dd4a24a34dbdfb0879384b0698fa3a8f',
			name: 'lolcat.jpg',
			type: 'image/jpeg',
			...
		} 
	} 
}
*/

 