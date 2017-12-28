'use strict';

const Promise = require('bluebird');
const level = require('level');

module.exports = cb => {

	level('./messages.db', {
		valueEncoding : 'json'
	}, (err, db) => {

		if(err) {
			throw new Error(err);
		}

		cb(db, {

			addToNumberHistory : (number, meta) => new Promise((resolve, reject) => {
				db.get(number, (err, val) => {
					if(err) {
						if(!err.notFound) {
							return reject(new Error('Unable to add message from ' + number + ' to message history'));
						}

						val = [meta];
					} else {
						val.push(meta);
					}

					db.put(number, val, (err, resp) => {
						if(err) {
							return reject(err);
						}
						resolve(val);
					});
				});
			})
		});
	});
};