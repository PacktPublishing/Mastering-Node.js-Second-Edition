require('seneca')()
.add({
    role: 'calculator',
    cmd: 'subtract'
}, (args, done) => {

    let result = args.operands[0] - args.operands[1];

    done(null, {
        result : result
    })
})
.use('mesh', {
    pin: {
        role: 'calculator',
        cmd: 'subtract'
    }
})
.listen({
    host: 'localhost',
    port: 8081
});