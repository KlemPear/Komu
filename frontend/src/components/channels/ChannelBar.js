import React from "react";
import { connect } from "react-redux";

class ChannelBar extends React.Component {
	render() {
		return (
			<div>
				<ul>
					<li>All Unread</li>
					<li>Threads</li>
					<li>Invites</li>
				</ul>
			</div>
		);
	}
}

export default connect(null, null)(ChannelBar);
