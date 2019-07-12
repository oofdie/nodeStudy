const http = require('http');
const mime = require('mime');
const fs = require('fs');
const path = require('path');
const chatServer = require('./chat_server.js');
const cache = {};

//404服务
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: resource not found');
    response.end();
}

//文件发送服务
function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {
        'Content-Type': mime.getType(path.basename(filePath)),
    })
    response.end(fileContents);
}

//静态文件服务
function serverStatic(response, cache, absPath) {
    //检查是否存在于内存中
    if(cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        //检查文件是否存在
        fs.exists(absPath, function(exists) {
            if (exists) {
                //在硬盘中读取文件
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        //缓存
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                })
            } else {
                send404(response);
            }
        })
    }
}

const server = http.createServer(function(request, response) {
    let filePath = false;
    if (request.url === '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }
    const absPath = './' + filePath;
    serverStatic(response, cache, absPath);
});

server.listen(8080, function() {
    console.log('server is running at http://localhost:8080');
})

chatServer.listen(server);
