import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";
import { logOutUser } from "../actions";

class Header extends React.Component {
	onLogOutSubmit = () => {
		console.log("logout was clicked!");
		this.props.logOutUser();
	};

	render() {
		if (this.props.isSignedIn) {
			return (
				<div className="ui secondary pointing menu">
					<Link to="/" className="item">
						Komu
					</Link>
					<Link to="/new-komu" className="item">
						New Komu
					</Link>
					<Link to="/Messages" className="item">
						Messages
					</Link>
					<Link to="/ShowUser" className="right menu item">
						Profile
					</Link>
					<button className="ui primary" onClick={this.onLogOutSubmit}>
						Log Out
					</button>
				</div>
			);
		} else {
			return (
				<div className="ui secondary pointing menu">
					<Link to="/" className="item">
						Komu
					</Link>
					<Link to="/Messages" className="item">
						Messages
					</Link>
					<Link to="/Register" className="right menu item">
						Sign Up
					</Link>
					<Link to="/Login" className="right menu item">
						Sign In
					</Link>
					<div className="right menu">
						<GoogleAuth />
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { logOutUser })(Header);
