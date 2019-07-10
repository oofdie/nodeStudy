var repl = require('repl');

var r = repl.start({ prompt: '> ' });

r.setupHistory('history.text', function(error, repl) {
	console.info(error);
	console.info(repl);
});
