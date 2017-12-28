const os = require('os');

//	Load average, as an Array
//
console.log(os.loadavg());

//	Total and free memory
//
console.log(os.totalmem());
console.log(os.freemem());

//	Information about CPUs, as an Array
//
console.log(os.cpus());
