import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../History";
import Header from "./Header";
import LandingPage from "./LandingPage";
import Messages from "./Messages/Messages";
import AddChannel from "./Messages/Sidebar/SidebarOption/AddChannel";

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path="/" exact component={LandingPage} />
						<Route path="/Messages" exact component={Messages} />
						<Route path="/Messages/create_channel" exact component={AddChannel} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
