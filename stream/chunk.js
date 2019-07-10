const fs = require('fs');

const stream = fs.createReadStream('./bigData.json');

stream.on('data', (chunk) => {
	console.info(chunk);
})

stream.on('end', () => {
	console.info('finished');
})
