'use strict';

const env = process.env;
const twilioAPI = require('twilio')(env.TWILIO_SID, env.TWILIO_AUTH_TOKEN);

module.exports = (server, dbApi) => {

	let smsUrl = env.URL + '/smswebhook';

	// Create the webhook on Twilio. If it doesn't succeed the bound
	// route will never be called. TODO: maybe catch this?
	//
	twilioAPI.incomingPhoneNumbers(env.TWILIO_PHONE_NUMBER_SID).update({
		smsUrl: smsUrl
	});

	server.post('/smswebhook', (req, res) => {

		let dat = req.body;

		let meta = {
			message		: dat.Body,
			received	: Date.now(),
			fromCountry	: dat.FromCountry,
			phoneNumber	: dat.From
		};

		dbApi
		.addToNumberHistory(dat.From, meta)
		.then(newVal => console.log('Received message from', dat.From))
		.catch(err => console.log("levelERRR:", err));

		res.end();
	});
};

{
	ToCountry: 'US',
	ToState: 'NY',
	SmsMessageSid: 'xxx',
	NumMedia: '0',
	ToCity: 'SOUTH RICHMOND HILL',
	FromZip: '11575',
	SmsSid: 'xxxx',
	FromState: 'NY',
	SmsStatus: 'received',
	FromCity: 'SOUTH RICHMOND HILL',
	Body: 'Hi! This is a test message!',
	FromCountry: 'US',
	To: '+5555554444',
	ToZip: '11244',
	NumSegments: '1',
	MessageSid: 'xxx',
	AccountSid: 'xxx',
	From: '+555555555',
	ApiVersion: '2010-04-01'
}

/*

Typical Twilio post body sent to hook:

 ToCountry: 'US',
 ToState: 'NY',
 SmsMessageSid: 'xxx',
 NumMedia: '0',
 ToCity: 'SOUTH RICHMOND HILL',
 FromZip: '11575',
 SmsSid: 'xxxx',
 FromState: 'NY',
 SmsStatus: 'received',
 FromCity: 'SOUTH RICHMOND HILL',
 Body: 'Hi! This is a test message!',
 FromCountry: 'US',
 To: '+5555554444',
 ToZip: '11244',
 NumSegments: '1',
 MessageSid: 'xxx',
 AccountSid: 'xxx',
 From: '+555555555',
 ApiVersion: '2010-04-01' }

*/