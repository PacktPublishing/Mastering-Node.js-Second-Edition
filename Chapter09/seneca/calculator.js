require('seneca')({ log: 'silent' })
.use('mesh')
.ready(function() {

    let seneca = this;

    seneca.act({
        role: 'calculator',
        cmd: 'add',
        operands: [7,3]
    }, (err, op) => console.log(`Addition result -> ${op.result}`));

    seneca.act({
        role: 'calculator',
        cmd:'subtract',
        operands: [7,3]
    }, (err, op) => console.log(`Subtraction result -> ${op.result}`));
});
