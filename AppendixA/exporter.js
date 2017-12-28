function MyClass() {
    this.foo = 'bar';
}

// require('thismodule').foo will be 'bar'
//module.exports = new MyClass();

// require('thismodule').foo will be undefined
exports = new MyClass();
