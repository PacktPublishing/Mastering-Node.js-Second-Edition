'use strict';

const es = require('event-stream');

module.exports = cb => es.writeArray(cb);
