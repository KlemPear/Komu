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
		return <EventForm onSubmit={this.onSubmit} />;
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
	return {
		selectedKomuId: state.misc.selectedKomuId,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, null)(AddEvent);
