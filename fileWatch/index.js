const FileWatch = require('./fileWatcher');
const fs = require('fs');

const watcher =  new FileWatch(__dirname + '/watch', __dirname + '/done');

watcher.on('process', (file) => {
    const watchFile = watcher.watchDir + '/' + file;
    const processedFile = watcher.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, (error, data) => {
        if (error) throw error;
        console.info(data);
    });
})

watcher.start();