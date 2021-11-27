import React from "react";
import "./Messages.css";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import { connect } from "react-redux";
import { fetchChannels } from "../../actions";
import _ from "lodash";
// socketIo
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

class Messages extends React.Component {
	constructor(props) {
		super(props);
		this.state = { socket: socketIOClient(ENDPOINT) };
	}
	componentDidMount() {
		this.props.fetchChannels(this.props.selectedKomuId);
		this.state.socket.on("APIConnected", () => {
			console.log("Socket connection made");
		});
	}

	componentWillUnmount() {
		this.state.socket.close();
		console.log("socket disconnected");
	}

	selectedChannel() {
		if (this.props.selectedChannelId) {
			return _.filter(this.props.channels, {
				_id: this.props.selectedChannelId,
			})[0];
		} else return null;
	}

	render() {
		return (
			<div className="app-body">
				<Sidebar socket={this.state.socket} />
				<Chat
					socket={this.state.socket}
					selectedChannel={this.selectedChannel()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		channels: Object.values(state.channels),
		selectedChannelId: state.misc.selectedChannelId,
		selectedKomuId: state.misc.selectedKomuId,
	};
};

export default connect(mapStateToProps, { fetchChannels })(Messages);
