import React from "react";
import { connect } from "react-redux";
import ShowUser from "../Users/ShowUser";
import komu from "../../apis/komu";

class ShowKomu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { users: null };
	}

	componentDidMount = async () => {
		const response = await komu.get(`${this.props.selectedKomuId}/get-users`);
		this.setState({ users: response.data });
	};

	renderUsers() {
		if (!this.state.users) {
			return <div>Loading Users...</div>;
		}
		return this.state.users.map((user) => (
			<div key={user._id}>
				<ShowUser user={user} />
			</div>
		));
	}

	render() {
		return (
			<div>
				<h2>{this.props.komu.name}</h2>
				<p>{this.props.komu.description}</p>
				<div>
					<h3>Users in this komu:</h3>
					{this.renderUsers()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		komu: state.komus[state.misc.selectedKomuId],
		selectedKomuId: state.misc.selectedKomuId,
	};
};

export default connect(mapStateToProps, null)(ShowKomu);
