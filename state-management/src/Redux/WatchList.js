import { useSelector, useDispatch } from "react-redux";
import { deleteMovie } from "./actions";

function List() {
	const movies = useSelector((state) => state.movies);
	const dispatch = useDispatch();

	const deleteOperation = (e) => {
		const btn = e.target;
		const movie_d = btn.name;

		dispatch(deleteMovie(movie_d));
	};

	return (
		<div className="list">
			<h2> Watch List :</h2>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>
						{movie.name} [{movie.watchOn}]
						<button name={movie.name} onClick={deleteOperation}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default List;
