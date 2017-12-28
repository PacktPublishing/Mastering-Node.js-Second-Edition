'use strict';

import React from 'react';
import {render} from 'react-dom';

export class MessageComposer extends React.Component {

	constructor(props) {
		super(props);
	}

	sendMessage(ev) {

		// Get message; clear input; exit if
		let input = document.getElementById('composer');
		let msg = input.value;

		input.value = '';

		if(msg.trim() === '') {
			return;
		}

		ws.sendMessage('response', msg);
	}

    render() {
        return <span>
        	<textarea id="composer"></textarea><button onClick={this.sendMessage}>send</button>
        </span>
    }
}

render(
    <MessageComposer />, document.getElementById('message-composer')
);
