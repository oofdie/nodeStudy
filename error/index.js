const net = require('net');
const events = require('events');

const channel = new events.EventEmitter();

process.on('Error', (err) => {
    console.info(err);
})

net.createServer((socket) => {
    socket.on('data', () => {
        channel.emit('error', new Error('this is an error'));
    })
}).listen(3000);
