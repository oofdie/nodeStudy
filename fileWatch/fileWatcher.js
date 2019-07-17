const events = require('events');
const fs = require('fs');

class FileWatcher extends events.EventEmitter {
    constructor(watchDir, processedDir) {
        super();
        this.watchDir = watchDir;
        this.processedDir =  processedDir;
    }

    watch = () => {
        fs.readdir(this.watchDir, (error, files) => {
            if (error) throw error;
            files.forEach(i => {
                this.emit('process', i);
            })
        })
    }

    start = () => {
        fs.watchFile(this.watchDir, () => {
            this.watch();
        })
    }
}

module.exports = FileWatcher;