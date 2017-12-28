const path = require('path');

console.log(path.normalize("../one////two/./three.html"));
// ../one/two/three.html

let join = path.join("../","one","two","three.html");
console.log(join);
// ../one/two/three.html

let dname = path.dirname("../one/two/three.html");
console.log(dname);
// ../one/two

let bname = path.basename("../one/two/three.html");
console.log(bname);
// three.html

// Remove any extension from the basename
let ename = path.basename("../one/two/three.html", ".html");
console.log(ename);
// three 

let pstring = "../one/two/three.html";
console.log(path.extname(pstring));
// .html
// Which is identical to:
console.log(pstring.slice(pstring.lastIndexOf(".")));

console.log(path.relative(
    '/one/two/three/four',
    '/one/two/thumb/war'
));
// ../../thumb/war

console.log(path.resolve('/one/two', '/three/four'));
// /three/four

path.resolve('/one/two/three', '../', 'four', '../../five')
// -> /one/five

console.log(path.resolve('one','two/three','four'));
// -> /users/home/john/one/two/three/four

