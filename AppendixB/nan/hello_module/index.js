// note that the compiled addon is placed under following path
const {sayHello} = require('./build/Release/hello');

console.log(sayHello());