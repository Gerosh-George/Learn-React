import { useContext } from "react";
import { MovieContext } from "./MovieContext";

function List() {
	const [movies, setMovies] = useContext(MovieContext);

	const deleteMovie = (e) => {
		const btn = e.target;
		const movie_d = btn.name;
		const updated_movies_list = [];
		movies.forEach((movie) => {
			if (movie.name !== movie_d) {
				updated_movies_list.push(movie);
			}
		});

		setMovies(updated_movies_list);
	};

	return (
		<div className="list">
			<h2> Watch List :</h2>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>
						{movie.name} [{movie.watchOn}]
						<button name={movie.name} onClick={deleteMovie}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default List;
