const fs = require('fs');

fs.readFile('./test.json', (error,data) => {
	console.info('readFile', data);
})

const obj = require('./test.json');
console.info('require', obj)
