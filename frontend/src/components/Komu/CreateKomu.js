import React from "react";
import { connect } from "react-redux";
import CreateKomuForm from "./CreateKomuForm";
import { createKomu } from "../../actions";

class CreateKomu extends React.Component {
	onSubmit = (formValues) => {
		this.props.createKomu({ ...formValues, userId: `${this.props.userId}`});
	};

	render() {
		return (
			<div>
				<h3>Create New Komu</h3>
				<CreateKomuForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createKomu })(CreateKomu);
