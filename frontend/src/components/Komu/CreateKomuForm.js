import React from "react";
import { Field, reduxForm } from "redux-form";

class CreateKomuForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input type={type} {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderTextInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<textarea {...input} autoComplete="off" />
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
					<Field name="name" component={this.renderInput} label="Komu Name" />
					<Field
						name="description"
						component={this.renderTextInput}
						label="description"
					/>
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.name) {
		errors.name = "You must enter a name";
	}
	if (!formValues.description) {
		errors.description = "You must enter a description";
	}
	return errors;
};

export default reduxForm({
	form: "CreateKomuForm",
	validate: validate,
})(CreateKomuForm);
