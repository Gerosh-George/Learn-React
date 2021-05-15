import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cocktail() {
	const [items, setItems] = useState([]);

	const fetchCocktails = async () => {
		const response = await fetch(
			"https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
		);
		const data = await response.json();
		//console.log(data);
		setItems(data.drinks);
	};

	useEffect(() => {
		fetchCocktails();
	}, []);

	return (
		<div className="cocktail-list">
			<h1>Cocktail List</h1>
			<ol className="list">
				{items.map((item) => {
					return (
						<li key={item.idDrink}>
							<Link to={`/cocktails/${item.idDrink}`}>{item.strDrink}</Link>
						</li>
					);
				})}
			</ol>
		</div>
	);
}

export default Cocktail;
