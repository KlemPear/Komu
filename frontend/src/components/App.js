import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import LandingPage from "./LandingPage";
import Messages from "./Messages/Messages";

const App = () => {
	return (
		<div className="ui container">
			<BrowserRouter>
				<div>
					<Header />
					<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/Messages" exact component={Messages} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
