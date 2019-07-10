const http = require('http');
const fs = require('fs');

const service = http.createServer();

service.on('request', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'image/jpg' });
	fs.createReadStream('./test.jpg').pipe(res);	
}).listen(8080);

console.info('Server is running at http://localhost:8080');

