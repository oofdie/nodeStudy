var repl = require('repl');

var r = repl.start({ prompt: '$ ' });

r.defineCommand('sayhello', {
	help: 'Say hello',
	action(name){
		this.clearBufferedCommand();
		console.info(`Hello ${name}`);
		this.displayPrompt(false);
	}
});

r.defineCommand('saybye', function() {
	console.info('Goodbye');
	this.close();
})

