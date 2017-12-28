const fs = require('fs');
const stream = require('stream');
const spy = new stream.PassThrough();

spy
.on('error', (err) => console.error(err))
.on('data', function(chunk) {
    console.log(`spied data -> ${chunk}`);
})
.on('end', () => console.log('\nfinished'));

fs.createReadStream('./passthrough.txt').pipe(spy).pipe(process.stdout);
