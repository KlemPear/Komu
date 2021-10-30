import React from "react";
import Modal from "../../../Modal";
import { Link } from "react-router-dom";
import history from "../../../../History";


class AddChannel extends React.Component {
	renderActions() {
		return (
			<React.Fragment>
				<button className="ui button primary">Submit</button>
				<Link to="/Messages" className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	renderContent = () => {
		return "This is where the add channel form will be";
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

export default AddChannel;
