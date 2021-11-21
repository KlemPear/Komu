import React from "react";
import { connect } from "react-redux";
import JoinKomuForm from "./JoinKomuForm";
import { joinKomu } from "../../actions";

class JoinKomu extends React.Component {
	onSubmit = (formValues) => {
		this.props.joinKomu({ ...formValues, userId: `${this.props.user._id}` });
	};

	renderUserAlreadyInKomu = () => {
		return <div>You are already part of this komu!</div>;
	};
	render() {
		return (
			<div>
				<h3>Join an existing Komu</h3>
				{this.props.userAlreadyInKomu ? this.renderUserAlreadyInKomu() : null}
				<JoinKomuForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		userAlreadyInKomu: state.misc.userAlreadyInKomu,
	};
};

export default connect(mapStateToProps, { joinKomu })(JoinKomu);
