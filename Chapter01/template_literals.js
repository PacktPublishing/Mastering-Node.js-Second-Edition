
let name = 'Sandro';
console.log('My name is ' + name);
console.log(`My name is ${name}`);

console.log('ha'.repeat(3)); // hahaha

console.log(`2 + 2 = ${2+2}`) // 2 + 2 = 4

for(let c of 'Mastering Node.js') {
    console.log(c);
    // M
    // a
    // s
    // ...
}

console.log([...'Mastering Node.js']);
// ['M', 'a', 's',...]


let targ = 'The rain in Spain lies mostly on the plain';
console.log(targ.startsWith('The', 0)); // true
console.log(targ.startsWith('The', 1)); // false
console.log(targ.endsWith('plain')); // true
console.log(targ.includes('rain', 5)); // false
