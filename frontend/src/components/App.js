import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../util/History";
import Header from "./Header";
import LandingPage from "./LandingPage/LandingPage";
import Messages from "./Messages/Messages";
import AddChannel from "./Messages/Sidebar/SidebarOption/AddChannel";
import Register from "./Users/Register";
import Login from "./Users/Login";
import ShowUser from "./Users/ShowUser";
import CreateKomu from "./Komu/CreateKomu";
import JoinKomu from "./Komu/JoinKomu";
import "./App.css";
import { connect } from "react-redux";
import ListKomus from "./Komu/ListKomus";
import Workspacebar from "./Workspacebar";
import ShowKomu from "./Komu/ShowKomu";
import Calendar from "./Calendar/Calendar";

class App extends React.Component {
	render() {
		return (
			<>
				<div className="ui container app">
					<Router history={history}>
						<Header />
						{this.props.isSignedIn ? <Workspacebar /> : null}
						<Switch>
							<Route path="/" exact component={LandingPage} />
							<Route
								path="/messages"
								exact
								component={
									this.props.isSignedIn && this.props.selectedKomuId != null
										? Messages
										: LandingPage
								}
							/>
							<Route
								path="/messages/create_channel"
								exact
								component={this.props.isSignedIn ? AddChannel : LandingPage}
							/>
							<Route path="/register" exact component={Register} />
							<Route path="/login" exact component={Login} />
							<Route
								path="/show-user"
								exact
								component={this.props.isSignedIn ? ShowUser : LandingPage}
							/>
							<Route
								path="/create-komu"
								exact
								component={this.props.isSignedIn ? CreateKomu : LandingPage}
							/>
							<Route
								path="/join-komu"
								exact
								component={this.props.isSignedIn ? JoinKomu : LandingPage}
							/>
							<Route
								path="/list-komus"
								exact
								component={this.props.isSignedIn ? ListKomus : LandingPage}
							/>
							<Route
								path="/show-komu"
								exact
								component={
									this.props.isSignedIn && this.props.selectedKomuId != null
										? ShowKomu
										: LandingPage
								}
							/>
							<Route
								path="/calendar"
								exact
								component={
									this.props.isSignedIn && this.props.selectedKomuId != null
										? Calendar
										: LandingPage
								}
							/>
						</Switch>
					</Router>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		selectedKomuId: state.misc.selectedKomuId,
	};
};

export default connect(mapStateToProps, null)(App);
