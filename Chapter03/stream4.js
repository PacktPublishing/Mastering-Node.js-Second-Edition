// Streams to the rescue
console.log('Copying...');
fs.createReadStream('source.bin')
.pipe(fs.createWriteStream('destination.bin'))
.on('close', () => { console.log('Done.'); });