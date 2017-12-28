
const addon = require('./build/Release/nan_addon');
const width = 1e9;

function log(type, result, start) {
    const end = Date.now() - start;
    console.log(`${type} returned <${result}> in ${end}ms`)
}

function sync() {
    const start = Date.now();
    const result = addon.runSync(width);
    log('Sync', result, start);
}

function async() {
    const start = Date.now();
    addon.runAsync(width, (err, result) => {
        log('Async', result, start);
    });
}

console.log('1');
async();
console.log('2');
sync();
console.log('3');



