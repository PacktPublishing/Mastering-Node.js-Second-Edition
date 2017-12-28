const assert = require('assert');
let a = [1,2,3];
let b = [1,2,3];
assert.deepEqual(a, b); // passes
assert.strictEqual(a, b); // throws Assertion error
