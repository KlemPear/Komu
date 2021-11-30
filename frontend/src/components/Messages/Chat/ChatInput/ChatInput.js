import React from "react";
import "./ChatInput.css";

class ChatInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: "" };
	}

	sendMessage = (e) => {
		e.preventDefault();
		this.props.onInputSubmit(this.state.input);
		this.setState({ input: "" });
	};

	userIsTyping = (e) => {
		if (this.state.input.length !== e.target.value) {
			this.props.onUserIsTyping();
		}
		this.setState({ input: e.target.value });
	};

	render() {
		return (
			<div className="chatInput">
				<form onSubmit={this.sendMessage}>
					<input
						value={this.state.input}
						//onChange={(e) => this.setState({ input: e.target.value })}
						onChange={this.userIsTyping}
						placeholder={`Send a message to #${this.props.channelName}`}
					/>
					<button type="submit">SEND</button>
				</form>
			</div>
		);
	}
}

export default ChatInput;
