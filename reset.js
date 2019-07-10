var repl = require('repl');

var r = repl.start({ prompt: '> ' });

function initContext(context) {
	context.m = 1;
}

initContext(r.context);

r.on('reset', initContext)

