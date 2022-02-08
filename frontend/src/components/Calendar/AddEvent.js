import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";

class AddEvent extends React.Component {
	renderActions() {
		return (
			<React.Fragment>
				<Link to="/calendar" onClick={this.props.toggle} className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	onSubmit = (formValues) => {
		return this.props.onEventSubmit(formValues);
	};

	renderContent = () => {
		return (
			<EventForm
				onSubmit={this.onSubmit}
				komuUsersOptions={this.props.komuUsersOptions}
			/>
		);
	};

	render() {
		return (
			<Modal
				title="Event"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={this.props.toggle}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	var komuUsersOptions = [];
	Object.values(
		state.komus[state.misc.selectedKomuId].users
	)?.map((user) =>
		komuUsersOptions.push({ value: user._id, label: `${user.firstName} ${user.lastName}` })
	);

	return {
		selectedKomuId: state.misc.selectedKomuId,
		user: state.auth.user,
		komuUsersOptions: komuUsersOptions,
	};
};

export default connect(mapStateToProps, null)(AddEvent);
