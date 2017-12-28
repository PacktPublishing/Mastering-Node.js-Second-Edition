const assert = require('assert');
try {
	assert.fail(1,2,'Bad!','NOT EQ')
} catch(e) { 
	console.log(e);
}

