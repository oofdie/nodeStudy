const http = require('http');

const services = http.createServer();

services.on('request', (req, res) => {
	res.writeHead(200, {
		message: 'ok',
		test: true,
	}, { 'Content-Type': 'a' });
	res.end('Hello World\n');
})
services.listen('8080');
console.log('Server is running at http://localhost:3000')
