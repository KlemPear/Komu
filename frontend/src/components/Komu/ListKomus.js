import React from "react";
import { connect } from "react-redux";
import { getKomusByUserId, selectKomu } from "../../actions";

class ListKomus extends React.Component {
	componentDidMount() {
		this.props.getKomusByUserId(this.props.user._id);
	}

	handleSelectKomu(komuId) {
		if (this.props.selectedKomuId == null) {
			this.props.selectKomu(komuId);
		}
		if (this.props.selectedKomuId && this.props.selectedKomuId !== komuId) {
			this.props.selectKomu(komuId);
		}
	}

	renderKomusName() {
		return this.props.komus.map((komu) => (
			<div key={komu._id} onClick={() => this.handleSelectKomu(komu._id)}>
				<h5>{komu.name}</h5>
				<p>{komu.description}</p>
        <br/>
				<p>Code: {komu.externalId}</p>
        <hr/>
			</div>
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
		selectedKomuId: state.misc.selectedKomuId,
	};
};

export default connect(mapStateToProps, { getKomusByUserId, selectKomu })(
	ListKomus
);
