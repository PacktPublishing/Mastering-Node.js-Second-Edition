let foo = 'bar';

if(foo == 'bar') {
    let foo = 'baz';
    console.log(foo); // 1st
}

console.log(foo); // 2nd
