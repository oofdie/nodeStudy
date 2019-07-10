const fs = require('fs');

const arr = Array.from(new Array(10000), (i, index) => index);

const obj = {};

arr.forEach(i => {
	obj[i] = i;
})

console.info(obj);

fs.writeFile('./bigData.json', JSON.stringify(obj), (err) => {
	console.info(err);
})
