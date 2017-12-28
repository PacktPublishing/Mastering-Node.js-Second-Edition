const vm = require('vm');
let sandbox = {
    count: 2
};
let suspectCode = '++count;';
vm.runInNewContext(suspectCode, sandbox);
console.log(sandbox);
// { count: 3 }



//suspectCode = '++count; process.exit()';
//vm.runInNewContext(suspectCode, sandbox);
//console.log(sandbox);

/*
evalmachine.<anonymous>:1
++count; process.exit()
^

ReferenceError: process is not defined
at evalmachine.<anonymous>:1:10
at ContextifyScript.Script.runInContext (vm.js:59:29)
...
    */