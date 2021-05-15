import "./App.css";
import Character from "./Charcter";
import { useState, useEffect } from "react";

function App() {
	const showCredits = () => {
		console.log("© 2021 MARVEL");
		console.log("Data provided by Marvel. © 2021 MARVEL");
		console.log(
			'<a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>',
		);
	};

	// it is triggered when app is loaded for the first time
	// [] paramter makes it trigger only one time
	useEffect(() => {
		showCredits();
	}, []);

	//states
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("spider-man");
	const [characterData, setCharacterData] = useState([]);
	const [comicData, setComicData] = useState([]);

	const API_KEY = process.env.REACT_APP_MARVEL_API_KEY;

	const fetchCharacter = async () => {
		const response = await fetch(
			encodeURI(
				`https://gateway.marvel.com:443/v1/public/characters?name=${query}&apikey=${API_KEY}`,
			),
		);

		const data = await response.json();

		if (data.data.results.length === 0) {
			alert("Invalid name entered...");
		} else {
			setCharacterData(data.data.results);
			getComics(data.data.results[0].comics.collectionURI);
		}
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();

		console.log("submitted");
		console.log(search);
		if (search !== "") {
			setQuery(search);
			setSearch("");
		}
	};

	// if we add any state variable in [] then this function will get triggered
	// whenever that state variable will be updated.. in this case its query
	useEffect(() => {
		console.log("effect loaded");

		fetchCharacter();
	}, [query]);

	const getComics = async (url) => {
		const response = await fetch(encodeURI(`${url}?limit=6&apikey=${API_KEY}`));
		const data = await response.json();

		setComicData(data.data.results);
	};

	const getCharacter = () => {
		if (characterData.length !== 0 && comicData.length !== 0) {
			const { id, name, description, thumbnail, urls } = characterData[0];
			const { url } = urls[0];

			return (
				<Character
					key={id}
					name={name}
					description={description}
					url={url}
					thumbnail={thumbnail}
					comicsList={comicData}
				/>
			);
		}
	};

	return (
		<div className="App">
			<div className="search-bar">
				<h2>Marvel App</h2>
				<form onSubmit={getSearch}>
					<input type="text" value={search} onChange={updateSearch} />
					<button type="submit">Submit</button>
				</form>
			</div>

			<div className="result">{getCharacter()}</div>
		</div>
	);
}

export default App;
