import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
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
					<Link to="/" className="item">
						Home
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
					<Link to="/Messages" className="item">
						Messages
					</Link>
					<Link to="/ShowUser" className="right menu item">
						Profile
					</Link>
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
					<Link to="/" className="item">
						Home
					</Link>
					<Link to="/Register" className="item">
						Sign Up
					</Link>
					<Link to="/Login" className="item">
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
