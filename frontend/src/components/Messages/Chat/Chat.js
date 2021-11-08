import React from "react";
import "./Chat.css";
import StarBorderOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Message from "../Message/Message";
import ChatInput from "./ChatInput/ChatInput";
import { connect } from "react-redux";
import { fetchMessages, postMessage } from "../../../actions";

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentChannelId: null };
	}

	componentDidMount() {
		const komuId = "61834ec8c6a1c6b2a87520ae";
		if (this.props.selectedChannel) {
			this.props.fetchMessages(komuId, this.props.selectedChannel._id);
			this.setState({ currentChannelId: this.props.selectedChannel._id });
		}
	}

	componentDidUpdate() {
		if (
			this.props.selectedChannel &&
			this.props.selectedChannel._id !== this.state.currentChannelId
		) {
			const komuId = "61834ec8c6a1c6b2a87520ae";
			this.props.fetchMessages(komuId, this.props.selectedChannel._id);
			this.setState({ currentChannelId: this.props.selectedChannel._id });
		}
	}

	renderMessages() {
		if (this.props.messages !== null) {
			return this.props.messages.map((m) => (
				<div key={m._id}>
					<Message text={m.text} author={m.author} updatedAt={m.updatedAt} />
				</div>
			));
		} else {
			return (
				<div>
					<h3>Say something, don't be shy!</h3>
				</div>
			);
		}
	}

	onInputSubmit = (input) => {
		const komuId = "61834ec8c6a1c6b2a87520ae";
		const userId = this.props.user._id;
		const formValues = {
			text: input,
			userId: userId,
		};
		this.props.postMessage(komuId, this.props.selectedChannel._id, formValues);
	};

	renderChatRoom() {
		return (
			<div className="chat">
				<div className="chat-header">
					<div className="chat-headerLeft">
						<h4 className="chat-channelName">
							<strong>#{this.props.selectedChannel.name}</strong>
							<StarBorderOutlineIcon />
						</h4>
					</div>
					<div className="chat-headerRight">
						<p>
							<InfoOutlinedIcon /> Details
						</p>
					</div>
				</div>
				<div className="chat-messages">{this.renderMessages()}</div>
				<ChatInput
					channelName={this.props.selectedChannel.name}
					onInputSubmit={this.onInputSubmit}
				/>
			</div>
		);
	}

	render() {
		if (!this.props.selectedChannel) {
			return <h3>Select a channel to start chatting!</h3>;
		}
		return this.renderChatRoom();
	}
}

const mapStateToProps = (state) => {
	return {
		messages: Object.values(state.messages),
		selectedChannelId: state.selectedChannelId?.id,
		user: state.auth.user
	};
};

export default connect(mapStateToProps, { fetchMessages, postMessage })(Chat);
