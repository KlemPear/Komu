import React from "react";
import { connect } from "react-redux";

import ChannelBar from "./ChannelBar";
import Chatroom from "./Chatroom";

class Channels extends React.Component {
	render() {
		return (
			<div>
				<h1>Channel Page</h1>
				<div className="ui grid">
					<div className="four wide column">
						<ChannelBar />
					</div>
					<div className="twelve wide column">
						<Chatroom />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, null)(Channels);
