process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

const db = {
    getFullName: () => Promise.resolve('Jack Spratt'),
    getAddress: () => Promise.resolve('10 Clean Street'),
    getFavorites: () => Promise.resolve('Lean')
};

async function profile() {

    let fullName = await db.getFullName(); // Jack Spratt
    let address = await db.getAddress(); // 10 Clean Street
    let favorites = await db.getFavorites(); // Lean

    return res =  {fullName, address, favorites};
}

profile().then(res => console.log(res)); // results = ['Jack Spratt', '10 Clean Street', 'Lean'


const {join} = require('path');
const {promisify} = require('util');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function $readDir (dir, acc = []) {
    await Promise.all((await readdir(dir)).map(async file => {
        file = join(dir, file);
        return (await stat(file)).isDirectory() && acc.push(file) && $readDir(file, acc)
    }));
    return acc;
}

$readDir(`./dummy_filesystem`).then(dirInfo => console.log(dirInfo));

// [ 'dummy_filesystem/folderA',
// 'dummy_filesystem/folderB',
// 'dummy_filesystem/folderA/folderA-C' ]


process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
