const httpProxy = httpProxy.createServer({
    router: {
    	'www.mywebsite.com'		: '127.0.0.1:8001',
    	'www.myothersite.com'	: '127.0.0.1:8002',
    }
});
httpProxy.listen(80);

