import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./actions";

function Nav() {
	const movies = useSelector((state) => state.movies);
	const loginStatus = useSelector((state) => state.loginStatus);
	const dispatch = useDispatch();

	const authenticate = () => {
		console.log("Want to login");
		if (loginStatus) {
			dispatch(logout());
		} else {
			dispatch(login());
		}
	};

	return (
		<nav>
			{loginStatus ? <h1>Hey, Gerosh🤘</h1> : <h1>Movies</h1>}
			<div>Watched: {movies.length}</div>
			<div className="login" onClick={authenticate}>
				{loginStatus ? "Logout" : "Login"}
			</div>
		</nav>
	);
}

export default Nav;
