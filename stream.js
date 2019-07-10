const fs = require('fs');
const data = 'Hello world';
const streamer = fs.createWriteStream('./stream.text');
streamer.write(data);
