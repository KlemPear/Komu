import React from "react";
import "./Chat.css";
import StarBorderOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Message from "../Message/Message";
import ChatInput from "./ChatInput/ChatInput";
import { connect } from "react-redux";
import { fetchMessages, postMessage, newMessage } from "../../../actions";

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.messagesEndRef = React.createRef();
		this.state = { currentChannelId: null, isTypingInfo: null };
	}

	scrollToBottom = () => {
		if(this.messagesEndRef.current){
			this.messagesEndRef.current.scrollIntoView();
		}
	};

	componentDidMount() {
		const komuId = this.props.selectedKomuId;
		if (this.props.selectedChannel) {
			this.props.fetchMessages(komuId, this.props.selectedChannelId);
			this.setState({ currentChannelId: this.props.selectedChannelId });
		}
		this.scrollToBottom();
	}

	componentDidUpdate() {
		if (
			this.props.selectedChannel &&
			this.props.selectedChannelId !== this.state.currentChannelId
		) {
			const komuId = this.props.selectedKomuId;
			this.props.fetchMessages(komuId, this.props.selectedChannelId);
			this.setState({ currentChannelId: this.props.selectedChannelId });
		}
		//socketIO
		this.props.socket.on("message", (channelId) => {
			if (channelId === this.props.selectedChannelId) {
				this.props.fetchMessages(
					this.props.selectedKomuId,
					this.props.selectedChannelId
				);
			}
		});
		// this.props.socket.on("isTyping", (isTypingInfo) => {
		// 	if (
		// 		isTypingInfo.channelId === this.props.selectedChannelId &&
		// 		isTypingInfo.userId !== this.props.user._id
		// 	) {
		// 		this.setState({ isTypingInfo: isTypingInfo });
		// 	}
		// });
		this.scrollToBottom();
	}

	renderMessages() {
		if (this.props.messages !== null) {
			return this.props.messages.map((m) => (
				<>
					<div key={m._id}>
						<Message text={m.text} author={m.author} updatedAt={m.updatedAt} />
					</div>
					<div ref={this.messagesEndRef} />
				</>
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
		const komuId = this.props.selectedKomuId;
		const userId = this.props.user._id;
		const formValues = {
			text: input,
			userId: userId,
		};
		this.props.postMessage(komuId, this.props.selectedChannelId, formValues);
		this.props.socket.emit("message", this.props.selectedChannelId);
	};

	onUserIsTyping = () => {
		const isTypingInfo = {
			userId: this.props.user._id,
			userName: `${this.props.user.firstName} ${this.props.user.lastName}`,
			channelId: this.props.selectedChannelId,
		};
		this.props.socket.emit("isTyping", isTypingInfo);
	};

	renderIsTyping = () => {
		if (this.state.isTypingInfo) {
			return (
				<>
					<span>{this.state.isTypingInfo.userName} is typing...</span>
				</>
			);
		}
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
					socket={this.props.socket}
					onUserIsTyping={this.onUserIsTyping}
					channelName={this.props.selectedChannel.name}
					onInputSubmit={this.onInputSubmit}
				/>
				<div>{this.renderIsTyping()}</div>
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
		selectedChannelId: state.misc.selectedChannelId,
		selectedKomuId: state.misc.selectedKomuId,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, {
	fetchMessages,
	postMessage,
	newMessage,
})(Chat);
