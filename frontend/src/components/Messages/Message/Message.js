import React from "react";
import "./Message.css";

class Message extends React.Component {
	render() {
		return (
			<div className="message">
				<div className="message-info">
					<h4>
						{this.props.message.author}
						<span className="message-timestamp">
							{this.props.message.updateAt}
						</span>
					</h4>
					<p>{this.props.message.text}</p>
				</div>
			</div>
		);
	}
}

export default Message;
