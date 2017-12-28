const seneca = require('seneca')({ log: 'silent' });
const clientHello = seneca.client(8080);
const clientGoodbye = seneca.client(8081);

seneca
.add({
    role: 'hello',
    cmd:'sayHello'
}, (args, done) => done(null, {message: "Hello!"}))
.listen(8082);

seneca
.add({
    role: 'goodbye',
    cmd:'sayGoodbye'
}, (args, done) => done(null, {message: "Goodbye"}))
.add({
    role: 'goodbye',
    cmd:'reallySayGoodbye'
}, (args, done) => done(null, {message: "Goodbye!!"}))
.listen(8083);

clientHello.act({
    role: 'hello',
    cmd: 'sayHello'
}, (err, result) => console.log(result.message));

clientGoodbye.act({
    role: 'goodbye',
    cmd: 'sayGoodbye'
}, (err, result) => console.log(result.message));
clientGoodbye.act({
    role: 'goodbye',
    cmd: 'reallySayGoodbye'
}, (err, result) => console.log(result.message));