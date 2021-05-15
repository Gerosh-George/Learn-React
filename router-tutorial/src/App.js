import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Cocktails from "./Cocktails";
import About from "./About";
import Nav from "./Nav";
import Recipe from "./Recipe";

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />

				<Switch>
					{/* exact means that path should exactly same as mentioned
					 and not a substring of larger path*/}

					<Route path="/" exact component={homepage} />
					<Route path="/about" component={About} />
					<Route path="/cocktails" exact component={Cocktails} />
					<Route path="/cocktails/:id" component={Recipe} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;

const homepage = () => {
	return (
		<div>
			<h1 className="title"> Welcome To Swirl Cocktail 🍸🍸</h1>
		</div>
	);
};
