
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/mycookie', (request, response) => {
	response.end(request.cookies.node_cookie);
});

app.get('/', (request, response) => {
	response.cookie('node_cookie', parseInt(Math.random() * 10e10));
	response.end("Cookie set");
});

app.listen(8000);
