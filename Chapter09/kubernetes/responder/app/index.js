const express = require('express');
const port = 8086;
const app = express();

app.get('/oneroute', (req, res) => {
    res.send('\nrouting service works!\n\n');
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));

