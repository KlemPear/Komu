import React from "react";
import { connect } from "react-redux";

import Message from "./Message";

class Chatroom extends React.Component {

	submitMessage(e) {
		e.preventDefault();
	}

	render() {
		const chats = [
				{
					username: "Clement",
					content: "salut",
					id: 1,
				},
				{
					username: "Hugo",
					content: "hello, ça va?",
					id: 2,
				},
				{
					username: "Clement",
					content: "yes et toi?",
					id: 3,
				},
				{
					username: "Hugo",
					content: "nickel, content d'utiliser l'appli?",
					id: 4,
				},
				{
					username: "Clement",
					content: "ouais c'est parfait",
					id: 5,
				},
				{
					username: "Hugo",
					content: "trop cool!",
					id: 6,
				},
			];

		return (
			<div className="chatroom">
				<h3>Name of Channel</h3>
				{chats.map((chat) => (
					<ul key={chat.id}>
						<Message chat={chat} />
					</ul>
				))}
				<form className="input" onSubmit={(e) => this.submitMessage(e)}>
					<input type="text" ref="msg" />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default connect(null, null)(Chatroom);
