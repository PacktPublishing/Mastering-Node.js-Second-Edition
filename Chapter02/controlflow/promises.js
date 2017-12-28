
const db = {
  getFullName: () => Promise.resolve('Jack Spratt'),
  getAddress: () => Promise.resolve('10 Clean Street'),
  getFavorites: () => Promise.resolve('Lean')
};

Promise.all([
    db.getFullName(), // Jack Spratt
    db.getAddress(), // 10 Clean Street
    db.getFavorites() // Lean
])
.then(results => {
    console.log(results);
    // results = ['Jack Spratt', '10 Clean Stree', 'Lean']
})
.catch(err => {
  //...
});

const {join} = require('path');
const {promisify} = require('util');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

function $readDir(dir, acc=[]) {
    return readdir(dir).then(files => Promise.all(files.map(file => {
        file = join(dir, file);
        return stat(file).then(fobj => {
            if (fobj.isDirectory()) {
                acc.push(file);
                return $readDir(file, acc);
            }
        });
    }))).then(() => acc);
};

$readDir(`./dummy_filesystem`).then(dirInfo => console.log(dirInfo));