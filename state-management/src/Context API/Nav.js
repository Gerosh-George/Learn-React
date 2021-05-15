import { useContext } from "react";
import { MovieContext } from "./MovieContext";

function Nav() {
	const [movies] = useContext(MovieContext);

	return (
		<nav>
			<h1>Movies</h1>
			<div>Watched: {movies.length}</div>
		</nav>
	);
}

export default Nav;
