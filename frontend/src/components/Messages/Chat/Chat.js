import React from "react";
import "./Chat.css";
import StarBorderOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Message from "../Message/Message";
import ChatInput from "./ChatInput/ChatInput";
import { connect } from "react-redux";
import { fetchMessages } from "../../../actions";

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentChannelId: null };
	}

	componentDidMount() {
		if (this.props.selectedChannel) {
			this.props.fetchMessages(this.props.selectedChannel._id);
			this.setState({ currentChannelId: this.props.selectedChannel._id });
		}
	}

	componentDidUpdate() {
		if (
			this.props.selectedChannel &&
			this.props.selectedChannel._id !== this.state.currentChannelId
		) {
			this.props.fetchMessages(this.props.selectedChannel._id);
			this.setState({ currentChannelId: this.props.selectedChannel._id });
		}
	}

	renderMessages() {
		return this.props.messages.map(
			({ message, timestamp, user, userImage, id }) => (
				<div key={id}>
					<Message
						message={message}
						timestamp={timestamp}
						user={user}
						userImage={userImage}
					/>
				</div>
			)
		);
	}

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
				<div className="chat-messages">
					{this.props.messages ? this.renderMessages() : null}
				</div>
				<ChatInput
					channelName={this.props.selectedChannel.name}
					channelId={this.props.selectedChannel._id}
				/>
			</div>
		);
	}

	render() {
		if (!this.props.selectedChannel) {
			return <h3>Select a channel to start chatting!</h3>;
		}
		return <div>{this.renderChatRoom()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		messages: Object.values(state.messages),
		selectedChannelId: state.selectedChannelId?.id,
	};
};

export default connect(mapStateToProps, { fetchMessages })(Chat);
