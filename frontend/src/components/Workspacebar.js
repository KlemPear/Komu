import React from "react";
import { Link } from "react-router-dom";
//import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";
import { logOutUser } from "../actions";
import "./Workspacebar.css";

class Workspacebar extends React.Component {
	onLogOutSubmit = () => {
		this.props.logOutUser();
	};

	render() {
		if (this.props.isSignedIn) {
			return (
				<div className="workspace">
					<Link to="/show-user" className="item">
						Profile
					</Link>
					<Link to="/create-komu" className="item">
						Create New Komu
					</Link>
					<Link to="/join-komu" className="item">
						Join a Komu
					</Link>
					<Link to="/list-komus" className="item">
						See my Komus
					</Link>
				</div>
			);
		} else {
			return (
				<div className="workspace">
					<Link to="/" className="item">
						Home
					</Link>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		selectedKomuId: state.misc.selectedKomuId,
	};
};

export default connect(mapStateToProps, { logOutUser })(Workspacebar);
