const events = require('events');
const net = require('net');
const clients = {};
const subscriptions = {};

const MyEmitter = new events.EventEmitter();

MyEmitter.on('join', (id, socket) => {
    if (!clients[id]) {
        clients[id] = socket;
    }
    socket.write('you are joined\n');
    subscriptions[id] = (senderId, message) => {
        if (senderId !== id) {
            clients[id].write(`${id}：${message}`);
        }
    }
    MyEmitter.on('broadcast', subscriptions[id]);
    MyEmitter.emit('broadcast', id, `${id} has joined this chat\n`);
})

MyEmitter.on('end', (id) => {
    delete clients[id];
    MyEmitter.removeListener('broadcast', subscriptions[id]);
    MyEmitter.emit('broadcast', id, `${id} has left the chat`);
})

const server = net.createServer((socket) => {
    const id = `${socket.remoteAddress}:${socket.remotePort}`;
    console.info(id);

    socket.on('data', (data) => {
        MyEmitter.emit('broadcast', id, data);
    });

    socket.on('close', () => {
        MyEmitter.emit('end', id);
    })
})

server.on('connection', (socket) => {
    const id = `${socket.remoteAddress}:${socket.remotePort}`;
    MyEmitter.emit('join', id, socket);
})

server.listen(8888);

