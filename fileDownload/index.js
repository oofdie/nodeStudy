const flow = require('nimble');
const { exec } = require('child_process');

const downloadNode = (version, callback) => {
    const url = `http://nodejs.org/dist/v${version}.tar.gz`;
    exec(`curl ${url} > /tmp/${version}.tgz`, callback);
}

flow.series([
    function (callback) {
        flow.parallel([
            function (callback) {
                console.info('0.4.6 is downloading...');
                downloadNode('0.4.6', callback);
            },
            function (callback) {
                console.info('0.4.7 is downloading...');
                downloadNode('0.4.7', callback);
            }
        ], callback)
    },
    function (callback) {
        exec('tar -cvf node_dist.tar /tmp/0.4.6.tgz /tmp/0.4.6.tgz', (err) => {
            if (err) throw err;
            console.info('All Done');
        })
    }
]);
