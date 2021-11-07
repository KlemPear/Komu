import React from "react";
import { connect } from "react-redux";

class ShowUser extends React.Component {
	render() {
		return (
			<div>
				<h3>User Profile</h3>
				<div>First Name: {this.props.user.firstName}</div>
				<div>Last Name: {this.props.user.lastName}</div>
				<hr />
				<div>Bio: {this.props.user.bio}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, null)(ShowUser);
