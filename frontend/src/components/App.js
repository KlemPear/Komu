import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../History";
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

class App extends React.Component {
	render() {
		return (
			<div className="ui container app">
				<Router history={history}>
					<Header />
					<Switch>
						<Route path="/" exact component={LandingPage} />
						<Route
							path="/Messages"
							exact
							component={this.props.isSignedIn ? Messages : LandingPage}
						/>
						<Route
							path="/Messages/create_channel"
							exact
							component={this.props.isSignedIn ? AddChannel : LandingPage}
						/>
						<Route path="/Register" exact component={Register} />
						<Route path="/Login" exact component={Login} />
						<Route
							path="/ShowUser"
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
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, null)(App);
