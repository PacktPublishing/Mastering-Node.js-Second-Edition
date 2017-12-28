require('seneca')()
.add({
    role: 'calculator',
    cmd: 'add'
}, (args, done) => {

    let result = args.operands[0] + args.operands[1];

    done(null, {
        result : result
    })
})
.use('mesh', {
    pin: {
        role: 'calculator',
        cmd: 'add'
    }
})
.listen({
    host: 'localhost',
    port: 8080
});