import React from 'react';
import {render} from 'react-dom';

export class Timeline extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			phone : '',
			messages: []
		};
	}
	
	componentDidMount() {
		ws.onmessage = mOb => {

			let data = JSON.parse(mOb.data);

			if(data.messages && data.phone) {
				return this.setState(data);
			}
		}
	}
	
	render() {
		return <div>
			<MessageHistory history={this.state} />
			</div>
	}
}

export class MessageHistory extends React.Component {

	constructor(props) {
		super(props);
	}

    render() {
    
    	let history = this.props.history;

        return <div id="timeline_container">
			<div className="history_header">
				<figure>{history.phone}</figure>
			</div>

            <ul> 
                { history.messages.map(function(it) {
                    return <li className="message_event" key={it.received}>
						<div className={"event_icn icon-emo-" + it.sentiment}></div>
						<div className="event_content">
							<p>{it.message}</p>
						</div>
						<div className="event_date">
							{it.date}
						</div>
					</li>
                }) }

            </ul>
        </div>;
    }
}

render(
    <Timeline />, document.getElementById('main')
);

