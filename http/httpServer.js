const http = require('http');

const services = http.createServer();

services.on('request', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World\n');
})
services.listen('8080');
console.log('Server is running at http://localhost:8080')
