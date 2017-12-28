const express = require('express');
const port = 8087;
const app = express();

app.use(express.static('public'));
app.get('/rerouter', (req, res) => {
    res.redirect('http://localhost:8086/oneroute');
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));




