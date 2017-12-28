const sinon = require('sinon');
const Capitalizer = require('./Capitalizer.js');

let capitalizer = new Capitalizer();
let arr = ['a','b','c','d','e'];

let  mock = sinon.mock(capitalizer);
 
// Expectations
mock.expects("capitalize").exactly(5).withArgs.apply(sinon, arr);

// Reality
arr.map(capitalizer.capitalize);

Verification
console.log(mock.verify());