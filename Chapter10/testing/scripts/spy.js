const sinon = require('sinon');
let argA = "foo";
let argB = "bar";
let callback = sinon.spy();
 
callback(argA); 
callback(argB);

console.log(
	callback.called,
	callback.callCount,
	callback.calledWith(argA),
	callback.calledWith(argB),
	callback.calledWith('baz')
);