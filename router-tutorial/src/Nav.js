import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav>
			<Link to="/">
				<h1>Swirl Cocktails</h1>
			</Link>

			<ul>
				<Link to="/about">
					<li>About</li>
				</Link>
				<Link to="/cocktails">
					<li>Cocktails</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Nav;
