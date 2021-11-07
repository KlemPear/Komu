import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../History";
import Header from "./Header";
import LandingPage from "./LandingPage";
import Messages from "./Messages/Messages";
import AddChannel from "./Messages/Sidebar/SidebarOption/AddChannel";
import Register from './Users/Register';
import Login from "./Users/Login";
import ShowUser from "./Users/ShowUser";

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path="/" exact component={LandingPage} />
						<Route path="/Messages" exact component={Messages} />
						<Route
							path="/Messages/create_channel"
							exact
							component={AddChannel}
						/>
						<Route path="/Register" exact component={Register} />
						<Route path="/Login" exact component={Login} />
						<Route path="/ShowUser" exact component={ShowUser} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
