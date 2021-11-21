import React from "react";
import "./Sidebar.css";
import { connect } from "react-redux";
import { fetchChannels, selectChannel } from "../../../actions";
import SidebarOption from "./SidebarOption/SidebarOption";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
//import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

class Sidebar extends React.Component {
	componentDidMount() {
		const komuId = "61834ec8c6a1c6b2a87520ae";
		this.props.fetchChannels(komuId);
	}

	handleChannelClick(channelId) {
		console.log("channel was clicked!");
		if (this.props.selectedChannelId == null) {
			this.props.selectChannel(channelId);
		}
		if (
			this.props.selectedChannelId &&
			this.props.selectedChannelId !== channelId
		) {
			this.props.selectChannel(channelId);
		}
	}

	render() {
		return (
			<div className="sidebar">
				<div className="siderbar-header">
					<div className="sidebar-info">
						<h3>
							<FiberManualRecordIcon />
							{this.props.user.firstName + ' ' + this.props.user.lastName}
						</h3>
					</div>
					<CreateIcon />
				</div>
				<SidebarOption Icon={InsertCommentIcon} title="Threads" />
				<SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
				<hr />
				<SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
				<hr />

				{/* Connect to db and list all the channels*/}
				{/* SidebarOptionn */}
				{this.props.channels.map((channel) => (
					<div
						key={channel._id}
						onClick={() => this.handleChannelClick(channel._id)}
					>
						<SidebarOption title={channel.name} />
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		channels: Object.values(state.channels),
		selectedChannelId: state.misc.selectedChannelid,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { fetchChannels, selectChannel })(
	Sidebar
);
