const http = require('http');
const Buffer = require('buffer').Buffer;
const url = require('url');

const todoList = [];

http.createServer((req, res) => {
    switch(req.method) {
        case "POST":
            let item = '';
            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                item += chunk;
            })
            req.on('end', () => {
                todoList.push(item);
            })
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, code: 200, message: 'ok' }));
            break;
        case 'GET':
            let body = '';
            todoList.forEach((job, index) => {
                body += `${index}) ${job}\n`;
            });
            res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': Buffer.byteLength(body) });
            res.end(body);
            break;
        case 'DELETE':
            const id = +url.parse(req.url).pathname.slice(1);
            if (Number.isNaN(id)) {
                res.writeHead(400);
                res.end('Bad Request');
            } else {
                todoList.splice(id,1);
                let body = 'Delete Done\n';
                todoList.forEach((job, index) => {
                    body += `${index}) ${job}\n`;
                });
                res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': Buffer.byteLength(body) });
                res.end(body);
            }
            break;
    }
}).listen(8080);