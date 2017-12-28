Object.defineProperty(Error, '__STACK', {
	get	: function() {
		let orig = Error.prepareStackTrace;
		Error.prepareStackTrace = (_, stack) => stack;
		let err = new Error();
		Error.captureStackTrace(err, arguments.callee);
		let stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	}
});

Object.defineProperty(Error, 'MAP', {
	get	: () => {
		let es = Error.__STACK[1];
		return {
			line		: es.getLineNumber(),
			column		: es.getColumnNumber(),
			funcName	: es.getFunctionName(),
			funcBody	: es.getFunction().toString(),
			fileName	: es.getFileName()
		}
	}
});

function foo() {
    console.log(Error.MAP);
}

foo();


