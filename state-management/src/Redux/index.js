import Nav from "./Nav";
import WatchList from "./WatchList";
import AddMovies from "./AddMovies";
import "./Movie.css";

function MovieApp() {
	return (
		<div>
			<Nav />
			<h1 className="main-t">Movie Watcher 🎦🍿</h1>
			<WatchList />
			<AddMovies />
		</div>
	);
}

export default MovieApp;
