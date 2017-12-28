const fs = require('fs');

function walk(dir, done, emitter) {
	let results = {};
	emitter = emitter || new (require('events').EventEmitter);
	
	fs.readdir(dir, (err, list) => {
	
		let pending = list.length;
		
		if(err || !pending) {
			return done(err, results);
		}

		list.forEach(file => {
		
			let dfile = `${dir}/${file}`;
			fs.stat(dfile, (err, stat) => {
				
				//	You might want to check for errors here as well.
				if(err) {
					throw err;
				}
				if(stat.isDirectory()) {
					emitter.emit('directory', dfile, stat);
					return walk(dfile, (err, res) => {
						results[file] = res;
						!--pending && done(null, results);
					}, emitter);
				} 
				
				emitter.emit('file', dfile, stat);
				results[file] = stat;
				!--pending && done(null, results);
			});
		});
	});
	
	return emitter;
}

walk(".", (err, res) => {
	console.log(require('util').inspect(res, {depth: null}));
}).on("directory", (path, stat) => {
	console.log(`Directory: ${path} - ${stat.size}`);
})
.on("file", (path, stat) => {
	console.log(`File: ${path} - ${stat.size}`);
});

