import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { loginUser } from "../../actions";

class Login extends React.Component {
	onSubmit = (formValues) => {
		this.props.loginUser(formValues);
	};

	render() {
		return (
			<div>
				<h3>Login</h3>
				<LoginForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(null, { loginUser })(Login);
