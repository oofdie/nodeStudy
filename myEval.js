const repl = require('repl');
function myEval(cmd, context, filename, callback) {
	context.global[cmd] = 1;
	callback(null, `now i input ${cmd}, and ${global[cmd]}`);
}

repl.start({prompt: '> ', eval: myEval});
