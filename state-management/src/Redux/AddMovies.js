import { useDispatch } from "react-redux";
import { addMovie } from "./actions";

function AddMovies() {
	const dispatch = useDispatch();

	const add = (e) => {
		e.preventDefault();

		const name = document.querySelector("#name").value;
		const platform = document.querySelector("#platform").value;
		document.querySelector("#name").value = "";
		document.querySelector("#platform").value = "";
		console.log(name, platform);

		const payload={
			name:name,
			platform:platform
		}

		dispatch(addMovie(payload));
	};

	return (
		<div className="form-section">
			<form onSubmit={add}>
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
