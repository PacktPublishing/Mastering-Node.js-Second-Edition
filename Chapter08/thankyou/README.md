# thankyou

## Purpose

This is a example (not production) client server for https://github.com/sandro-pasquali/switchboard

`switchboard` receives and broadcasts SMS messages sent through a Twilio gateway, and this client provides an interface that will show the history of messages sent to your Twilio phone number, and provides a response interface (in the browser) for you to compose and send responses. 

`thankyou` handles one phone number at a time. Once you start the server and connect (via localhost:8080) in your browser you will receive the next message sent to the Twilio number you've configured. For example:

- You've registered +15555555555 as your Twilio number and started a properly configured `switchboard` server that services that number.
- On your local machine you start up `thankyou`, running `npm i` > `npm run config` > `npm start` etc.
- You see an interface without any information.
- +15555555555 receives an SMS message "Hello" from number X.
- The `thankyou` web interface will automatically update, displaying that message.
- You write back a response via the UI.
- The person who sent the SMS message receives your response, and your response is simultaneously displayed in your browser UI.
- You converse back and forth like this until such time as you close your browser.
- Icons indicate the sentiments exchanged, both yours and the customer's.

## Build

```
npm i
gulp
npm run config // Configure this client with the URL of the `switchboard` server you will be connecting to:
node server.js
```

To run using PM2 (process runner)

```
npm start
```

For more info on PM2: https://github.com/Unitech/pm2


