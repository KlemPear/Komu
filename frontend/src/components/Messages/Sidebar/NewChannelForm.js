import React from "react";
import { Field, reduxForm } from "redux-form";

class NewChannelForm extends React.Component {
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
						name="name"
						component={this.renderInput}
						label="Enter channel name"
					/>
					<Field
						name="description"
						component={this.renderInput}
						label="Enter description"
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
		errors.title = "You must enter a name for this channel";
	}
	if (!formValues.description) {
		errors.description = "You must enter a short description";
	}
	return errors;
};

export default reduxForm({
	form: "NewChannelForm",
	validate: validate,
})(NewChannelForm);
