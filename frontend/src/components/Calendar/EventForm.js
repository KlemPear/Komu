import React from "react";
import { Field, reduxForm } from "redux-form";
import CustomSelect from "../Utils/CustomSelect";

class EventForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderGuestsInput = ({ input, label, meta }) => {
		const guestInput = (selectedGuest) => {
			input.onChange(selectedGuest?.map((guest) => guest.value));
		};

		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<CustomSelect Options={this.props.komuUsersOptions} onSelect={guestInput} />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		//do whatever we need with the form values
		//send to a server, call an api etc...
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Field
						name="title"
						component={this.renderInput}
						label="Enter event title"
					/>
					<Field
						name="description"
						component={this.renderInput}
						label="Enter description"
					/>
					<Field
						name="guests"
						component={this.renderGuestsInput}
						label="Select guests"
					/>
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.name = "You must enter a title for this event";
	}
	if (!formValues.description) {
		errors.description = "You must enter a short description";
	}
	if (!formValues.guests) {
		errors.guests = "You must enter a user ID";
	}
	return errors;
};

export default reduxForm({
	form: "EventForm",
	validate: validate,
})(EventForm);
