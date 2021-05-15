import { useContext } from "react";
import { MovieContext } from "./MovieContext";

function AddMovies() {
	const [movies, setMovies] = useContext(MovieContext);

	const addMovie = (e) => {
		e.preventDefault();

		const name = document.querySelector("#name").value;
		const platform = document.querySelector("#platform").value;
		document.querySelector("#name").value = "";
		document.querySelector("#platform").value = "";

		setMovies([
			...movies,
			{
				name: name,
				watchOn: platform,
				id: movies.length === 0 ? 0 : movies[movies.length - 1].id + 1,
			},
		]);
	};

	return (
		<div className="form-section">
			<form onSubmit={addMovie}>
				<h4> Add Movies </h4>

				<div>
					Name: <input type="text" id="name" required></input>
				</div>
				<div>
					Platform: <input type="text" id="platform" required></input>
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AddMovies;
