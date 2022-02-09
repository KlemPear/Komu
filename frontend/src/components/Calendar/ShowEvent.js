import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { Link } from "react-router-dom";

class ShowEvent extends React.Component {
	renderActions() {
		return (
			<React.Fragment>
				<Link to="/calendar" onClick={this.props.toggle} className="ui button">
					Back
				</Link>
				<Link to="/calendar" onClick={this.props.toggle} className="ui blue button">
					Edit
				</Link>
				<Link to="/calendar" onClick={this.props.delete} className="ui negative button">
					Delete
				</Link>
			</React.Fragment>
		);
	}

	renderContent = () => {
		var date = "";
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		if (this.props.event.allDay) {
			date = new Date(Date.parse(this.props.event.startStr)).toLocaleDateString(
				"en-US",
				options
			);
		} else {
			const timeStart = new Date(
				Date.parse(this.props.event.startStr)
			).toLocaleTimeString("en-US");
			const timeEnd = new Date(
				Date.parse(this.props.event.endStr)
			).toLocaleTimeString("en-US");
			const eventDay = new Date(
				Date.parse(this.props.event.startStr)
			).toLocaleDateString("en-US", options);
			date = eventDay + ", " + timeStart + " - " + timeEnd;
		}
		return (
			<div>
				<h2>{date}</h2>
				<h3>{this.props.event.title}</h3>
				<p>{this.props.event.description}</p>
				<hr />
				<p>Guests: {this.props.event.guests}</p>
			</div>
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
	return {
		selectedKomuId: state.misc.selectedKomuId,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, null)(ShowEvent);
