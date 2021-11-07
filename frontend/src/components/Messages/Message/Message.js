import React from "react";
import "./Message.css";

class Message extends React.Component {
	render() {
		const date = new Date(Date.parse(this.props.updatedAt)).toLocaleTimeString(
			"en-US"
		);
		return (
			<div className="message">
				<div className="message-info">
					<h4>
						{this.props.author.firstName + " " + this.props.author.lastName}
						<span className="message-timestamp">{date}</span>
					</h4>
					<p>{this.props.text}</p>
				</div>
			</div>
		);
	}
}

export default Message;
