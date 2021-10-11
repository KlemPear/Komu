import React from "react";
import "./Messages.css";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import { connect } from "react-redux";
import { fetchChannels } from "../../actions";
import _ from "lodash";

class Messages extends React.Component {
	componentDidMount() {
		this.props.fetchChannels();
	}

	selectedChannel() {
		if (this.props.selectedChannelId) {
			return _.filter(this.props.channels, {
				id: this.props.selectedChannelId,
			})[0];
		} else return null;
	}

	render() {
		return (
			<div className="App">
				<div className="app-body">
					<Sidebar />
					<Chat selectedChannel={this.selectedChannel()} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		channels: Object.values(state.channels),
		selectedChannelId: state.selectedChannel.id,
	};
};

export default connect(mapStateToProps, { fetchChannels })(Messages);
