import React from "react";
import { connect } from "react-redux";
import { getKomusByUserId } from "../../actions";

class ListKomus extends React.Component {
	componentDidMount() {
		this.props.getKomusByUserId(this.props.user._id);
	}

	renderKomusName() {
		return this.props.komus.map((komu) => (
			<div key={komu._id}>{komu.name}</div>
		));
	}

	render() {
		return (
			<div>
				<h3>List of your Komus</h3>
				{this.props.komus != null ? this.renderKomusName() : "Loading..."}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		komus: Object.values(state.komus),
	};
};

export default connect(mapStateToProps, { getKomusByUserId })(ListKomus);
