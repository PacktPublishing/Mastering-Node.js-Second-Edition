const httpProxy = require('http-proxy');
const addresses = [
	{
		host: 'one.example.com',
		port: 80
	},
	{
		host: 'two.example.com',
		port: 80
	}
];

httpProxy.createServer((req, res, proxy) => {
	let target = addresses.shift();
	proxy.proxyRequest(req, res, target);
	addresses.push(target);
}).listen(80);