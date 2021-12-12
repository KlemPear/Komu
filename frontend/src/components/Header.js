import React from "react";
import { Link } from "react-router-dom";
//import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";
import { logOutUser } from "../actions";

class Header extends React.Component {
	onLogOutSubmit = () => {
		this.props.logOutUser();
	};

	render() {
		if (this.props.isSignedIn) {
			return (
				<div className="ui secondary pointing menu">
					{this.props.selectedKomuId != null ? (
						<Link to="/show-komu" className="item">
							{this.props.selectedKomu.name}
						</Link>
					) : null}
					<Link to="/calendar" className="item">
						Calendar
					</Link>
					{this.props.selectedKomuId != null ? (
						<Link to="/Messages" className="item">
							Messages
						</Link>
					) : null}
					{/* <Link to="/ShowUser" className="right menu item">
						Profile
					</Link> */}
					<Link to="/">
						<button
							className="ui btn btn-primary"
							onClick={this.onLogOutSubmit}
						>
							Log Out
						</button>
					</Link>
				</div>
			);
		} else {
			return (
				<div className="ui secondary pointing menu">
					<Link to="/Register" className="item">
						Sign Up
					</Link>
					<Link to="/Login" className="item">
						Sign In
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
		selectedKomu: state.komus[state.misc.selectedKomuId],
	};
};

export default connect(mapStateToProps, { logOutUser })(Header);
