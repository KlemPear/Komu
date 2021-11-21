import React from "react";
import { connect } from "react-redux";
import Modal from "../../../Modal";
import { Link } from "react-router-dom";
import history from "../../../../History";
import NewChannelForm from "../NewChannelForm";
import { createChannel } from "../../../../actions/index";

class AddChannel extends React.Component {
	renderActions() {
		return (
			<React.Fragment>
				<Link to="/Messages" className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	onSubmit = (formValues) => {
		const komuId = this.props.selectedKomuId;
		const userId = this.props.user._id;
		const newFormValues = { ...formValues, usersId: [userId] };
		this.props.createChannel(newFormValues, komuId);
	};

	renderContent = () => {
		return <NewChannelForm onSubmit={this.onSubmit} />;
	};

	render() {
		return (
			<Modal
				title="Add Channel"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push("/Messages")}
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

export default connect(mapStateToProps, { createChannel })(AddChannel);
