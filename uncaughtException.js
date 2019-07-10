process.on('uncaughtException', () => console.log('uncaughtException'));
throw new Error('aaa');
