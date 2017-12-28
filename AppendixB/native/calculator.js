const calculator = require('./calculator_module');

let shouldBeFive = calculator.add(2,3);
let shouldBeOne = calculator.subtract(3,2);

console.log(`2 + 3 = ${shouldBeFive}`);
console.log(`3 - 2 = ${shouldBeOne}`);