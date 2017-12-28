const express = require('express');
const port = 8087;
const app = express();
const message = `Service #${Date.now()} responding`;

app.get('/', (req, res) => {
    res.send(message);
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));




