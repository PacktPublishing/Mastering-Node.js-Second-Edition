# switchboard

You will need to install this on a server. See instructions for Heroku, below.

This is a switchboard that will receive/dispatch SMS messages send through the Twilio gateway. 

You will need to create a Twilio account and get a phone number you can use to receive messages (and to send messages).

It does not provide a (web) client for displaying/composing these messages.

A sample client for communicating with the switchboard can be found at:

https://github.com/sandro-pasquali/thankyou

## Deploying on Heroku
```
Heroku provides free accounts. This is how to deploy the /switchboard application to a Node.js-enabled server on Heroku.

Create Heroku account
Create a Github account
Fork the following repository into your Github account
	https://github.com/sandro-pasquali/switchboard
Clone your fork of /switchboard onto your local machine
	This is the repository that you will be using to make changes and deploy to a Heroku server.
Enter the /switchboard directory
Ensure that you have the Heroku tool belt installed 
	> heroku
If not, install it:
	https://toolbelt.heroku.com/
From the /switchboard directory
	> heroku create
		You will see something like:
		Creating fringuante-moliere-3548... done, stack is cedar-14
		https://fringuante-moliere-3548.herokuapp.com/ | https://git.heroku.com/fringuante-moliere-3548.git
		Git remote heroku added
		
Now create an app on Heroku by pushing the /switchboard repo
	> git push heroku master
	You should see a lot of installation instructions
Go to your app URL (something like https://fringuante-moliere-3548.herokuapp.com/)
You should see that there is an Application Error
To get status info on your application use:
	> heroku logs
	To keep a running log (recommended):
		> heroku logs --tail
You will see errors relating to the absence of certain environment variables.
Step 1: You need to create a test account on Twilio to get some API variables:
	Go to https://www.twilio.com/ and sign up for a test account
	Set up a test phone number
	Now you need to add some keys to your Heroku app
To set environment variables for Heroku apps:
	Go to your Heroku dashboard 
	Click on your instance
	Hit "Settings"
	Hit "Reveal Config Vars"
	Enter the following K/V pairs and SAVE:
		TWILIO_AUTH_TOKEN
			<your auth token>
		TWILIO_SID
			<your sid>
		TWILIO_PHONE_NUMBER_SID
			<your phone # sid>
		TWILIO_DEFAULT_FROM
			<your assigned phone number>
				This is the number that people will text to in order to use the thankyou/switchboard application
		SOCK_PORT
			8080 
		URL
			Your server URL (no trailing slash), i.e.:
			https://fringuante-moliere-3548.herokuapp.com
Shortcut to check your server again (should open browser):
	> heroku open
You should see "ok"

To log in to shell:
	heroku run bash
```