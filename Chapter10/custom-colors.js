const util = require('util');
util.inspect.styles.number = 'green';
console.log(util.inspect([1,2,4,5,6], {colors: true}));
// [1,2,3,4,5,6] Numbers are in green