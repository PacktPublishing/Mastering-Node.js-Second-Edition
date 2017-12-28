'use strict';

const Twilio = require('twilio');
const twilioAPI = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = (number, message) => twilioAPI.messages.create({
	to: number,
	from: process.env.TWILIO_DEFAULT_FROM,
	body: message
});

