import React from "react";
import "./Sidebar.css";
import { connect } from "react-redux";
import { fetchChannels, selectChannel } from "../../../actions";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOption from "./SidebarOption/SidebarOption";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

class Sidebar extends React.Component {
	componentDidMount() {
		this.props.fetchChannels();
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
							Clément Poirier
						</h3>
					</div>
					<CreateIcon />
				</div>
				<SidebarOption Icon={InsertCommentIcon} title="Threads" />
				<SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
				<SidebarOption Icon={DraftsIcon} title="Saved items" />
				<SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
				<SidebarOption Icon={FileCopyIcon} title="File browser" />
				<SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
				<SidebarOption Icon={AppsIcon} title="Apps" />
				<SidebarOption Icon={ExpandLessIcon} title="Show less" />
				<hr />
				<SidebarOption Icon={ExpandMoreIcon} title="Channels" />
				<hr />
				<SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

				{/* Connect to db and list all the channels*/}
				{/* SidebarOptionn */}
				{this.props.channels.map((channel) => (
					<div
						key={channel.id}
						onClick={() => this.handleChannelClick(channel.id)}
					>
						<SidebarOption title={channel.title} />
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		channels: Object.values(state.channels),
		selectedChannelId: state.selectedChannel?.id,
	};
};

export default connect(mapStateToProps, { fetchChannels, selectChannel })(
	Sidebar
);
