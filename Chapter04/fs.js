const fs = require('fs');

fs.open('path.js', 'r', (err, fd) => {
    fs.fstat(fd, (err, stats) => {
    
    	let totalBytes = stats.size;
        let buffer = new Buffer(totalBytes);
        let bytesRead = 0;

		//	Each call to #read should ensure that the chunk being read is
		//	within proper size ranges (not too small; not too large).
		let read = (chunkSize) => {
		    fs.read(fd, buffer, bytesRead, chunkSize, bytesRead, (err, numBytes, bufRef) => {
		    
		    	if((bytesRead += numBytes) < totalBytes) {
		    		return read(Math.min(512, totalBytes - bytesRead));
		    	}
		    	
		    	fs.close(fd);
		    	
		    	//	The file will exist in #buffer; report total bytes read.
		    	//
		    	console.log("File read complete. Total bytes read: " + totalBytes);
		    	console.log(buffer.toString());
		    });
		};
		
		read(Math.min(512, totalBytes));
    });
});
