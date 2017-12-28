const pm2 = require('pm2');

pm2.connect(err => {
	pm2.start('script.js', { 
		name: 'programmed script runner',
		scriptArgs: [
			'first',
			'second',
			'third'
		],
		execMode : 'fork_mode'
	}, (err, proc) => {
		if(err) {
			throw new Error(err);
		}
	});
});

