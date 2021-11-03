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
		const komuId = "1";
		const userId = "086ab3e86504452ba51937e723e7bdeb";
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

export default connect(null, { createChannel })(AddChannel);
