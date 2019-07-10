const repl = require('repl');
function myEval(cmd, context, filename, callback) {
	let result;
	try {
		result = vm.runInThisContext(cmd, 'output.vm');
	} catch(e) {
		if (isRecoverableError(e)) {
			return callback(new repl.Recoverable(e));
		}
	}
	callback(null, result);
}

function isRecoverableError(error) {
	if (error.name === 'SyntaxError') {
		return /^(Unexpected end of input|Unexpected token)/.test(error.message);
	}
	return false;
}

repl.start({ prompt: '> ', eval: myEval  });
