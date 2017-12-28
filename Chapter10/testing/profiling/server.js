const Express = require('express');
let app = Express();

function $alloc() {
    Buffer.alloc(1e6, 'Z');
}

app.get('/', function $serverHandler(req, res) {

    let d = 100;
    while(d--){ $alloc() }

    res.status(200).send(`I'm done`);
})

app.listen(8080);