import { useState, useEffect } from "react";

function Recipe({ match }) {
	const [recipe, setRecipe] = useState({});

	console.log(match);

	const fecthRecipe = async () => {
		const response = await fetch(
			`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`,
		);
		const data = await response.json();
		//console.log(data);
		setRecipe(data.drinks[0]);
	};

	const getIngredients = () => {
		let ingredients = [];
		for (var i = 0; i < 15; i++) {
			let key = "strIngredient" + (i + 1);
			if (recipe[key] !== null) {
				ingredients.push(recipe[key]);
			} else {
				break;
			}
		}
		return ingredients;
	};

	useEffect(() => {
		fecthRecipe();
	}, []);

	return (
		<div className="recipe-container">
			<div className="recipe">
				<h1>{recipe.strDrink}</h1>
				<img src={recipe.strDrinkThumb} alt="cocktail-img" width="300" />
				<div>
					<span className="highlight">Glass:</span> {recipe.strGlass}
				</div>
				<div>
					<div className="highlight">Ingredients:</div>
					<ul>
						{getIngredients().map((ingredient, index) => {
							return <li key={index}>{ingredient}</li>;
						})}
					</ul>
				</div>

				<div className="instruction">
					<div className="highlight">Instruction</div>
					{recipe.strInstructions}
				</div>
			</div>
		</div>
	);
}

export default Recipe;
