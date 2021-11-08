import React from "react";
import "./SidebarOption.css";
import { Link } from "react-router-dom";

function SidebarOption({ Icon, title, addChannelOption }) {
	if (addChannelOption) {
		return (
			<div className="sidebarOption">
				<h3 className="sidebarOption-channel">
					<span className="sidebarOption-hash">#</span>
					<Link to="Messages/create_channel" className="sidebarOption-channel">{title}</Link>
				</h3>
			</div>
		);
	}
	return (
		<div className="sidebarOption">
			{Icon && <Icon className="sidebarOption-icon" />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<h3 className="sidebarOption-channel">
					<span className="sidebarOption-hash">#</span> {title}
				</h3>
			)}
		</div>
	);
}

export default SidebarOption;
