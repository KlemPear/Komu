import React from "react";


class Message extends React.Component{
	render() {
		return (
			<div>
				<li>
					<div>{this.props.chat.username}</div>
					<div>{this.props.chat.content}</div>
				</li>
			</div>
		);
	}
}


export default Message;
