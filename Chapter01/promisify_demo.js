const {promisify} = require('util');
const fs = require('fs');

let readFileAsync = promisify(fs.readFile);
let [executable, absPath, target, ...message] = process.argv;

console.log(message.length ? message.join(' ') : `Running file ${absPath} using binary ${executable}`);

readFileAsync(target, {encoding: 'utf8'})
.then(console.log)
.catch(err => {
    let message = err.message;
    console.log(`
        An error occurred!
        Read error: ${message}
    `);
});