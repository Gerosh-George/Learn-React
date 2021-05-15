import "./Movie.css";
import Nav from "./Nav";
import WatchList from "./WatchList";
import AddMovies from "./AddMovies";
import { MovieProvider } from "./MovieContext";

function MovieApp() {
	return (
		<div>
			<MovieProvider>
				<Nav />
				<h1 className="main-t">Movie Watcher 🎦🍿</h1>
				<WatchList />
				<AddMovies />
			</MovieProvider>
		</div>
	);
}

export default MovieApp;
