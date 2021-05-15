var movies = [
	{
		name: "Matrix",
		watchOn: "DisneyPlus",
		id: 1,
	},
	{
		name: "Jojo Rabbit",
		watchOn: "Netflix",
		id: 2,
	},
	{
		name: "Tenet",
		watchOn: "Amazon Prime Video",
		id: 3,
	},
];

const addMovie = (data) => {
	console.log("add");
	console.log(data.name, data.platform);

	movies = movies.concat({
		name: data.name,
		watchOn: data.platform,
		id: movies.length === 0 ? 0 : movies[movies.length - 1].id + 1,
	});

	console.log(movies);
	return movies;
};

const deleteMovie = (name) => {
	console.log("delete");
	console.log(name);

	const updated_movies_list = [];
	movies.forEach((movie) => {
		if (movie.name !== name) {
			updated_movies_list.push(movie);
		}
	});

	movies = updated_movies_list;
	console.log(movies);
	return movies;
};

const movieReducer = (state = movies, action) => {
	switch (action.type) {
		case "ADD":
			return addMovie(action.payload);
		case "DELETE":
			return deleteMovie(action.payload);
		default:
			return state;
	}
};

export default movieReducer;
