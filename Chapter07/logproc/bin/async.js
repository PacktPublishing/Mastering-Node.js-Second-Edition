module.exports = {

	//	Non-blocking *serial* iteration through an array of methods.
	//
	//	@param	{Function}	fn			The iterator method.
	//	@param	{Function{	[finalCb]	A method to call when stack is cleared. Passed the
	//									result object.
	//	@param	{Array}		[targ]		The array to iterate through. Defaults to Subject.
	//
	serial : function(fn, finalCb, targ) {
		targ = targ || [];
		finalCb	= finalCb || function(){};
	
		let	results	= {
			errored	: false,
			last	: null,
			stack	: []
		};
		let len	= targ.length;
		let idx = 0;
	
		//	Call the sent iterator method for each member of #targ. If #iterator returns
		//	false (not falsy...===false) push #idx to #len, terminating further iteration.
		//	Otherwise, update the #results object. Ultimately, fire #finalCb.
		//
		let iter = function() {
			if(false === fn.call(this, targ[idx], idx, results, function(err, res) {
	
				++idx;
	
				results.errored = results.errored || err;
				results.last 	= res;
				results.stack.push(res);
	
				if(idx < len) {
					process.nextTick(iter);
				} else {
					finalCb.call(this, results);
				}
			})) {
				idx = len;
				finalCb.call(this, results);
			}
		};
	
		iter();
	},

	//	Non-blocking *parallel* execution of an array of methods.
	//
	//	@param	{Function}	fn			The iterator method.
	//	@param	{Function{	[finalCb]	A method to call when stack is cleared. Passed the
	//									result object.
	//	@param	{Array}		[targ]		The array to iterate through. Defaults to Subject.
	//
	parallel : function(fn, finalCb, targ) {
	
		targ	= targ || [];
		finalCb	= finalCb || function(){};
	
		let	results	= {
			errored	: false,
			last : null,
			stack : []
		};
		let len	= targ.length;
		let idx	= 0;
		let cnt = 0;
	
		while(idx < len) {
			fn.call(this, targ[idx], idx, results, function(err, res, ridx) {
	
				results.errored = results.errored || err;
				results.last	= res;
	
				if(ridx !== void 0) {
					results.stack[ridx] = res;
				} else {
					results.stack.push(res);
				}
	
				++cnt;
	
				if(cnt === len) {
					finalCb.call(this, results);
				}
			});
	
			++idx;
		}
	}
};