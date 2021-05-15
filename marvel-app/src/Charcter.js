import React from "react";
import style from "./character.module.css";
import Comic from "./Comic";

function Character({ name, description, thumbnail, url, comicsList }) {
	const imgSrc = thumbnail.path + "/portrait_uncanny." + thumbnail.extension;

	const checkImageAvailabilty = (comic) => {
		const path = comic.thumbnail.path;
		const check = path.substring(path.lastIndexOf("/") + 1);
		if (check === "image_not_available") {
			return false;
		} else {
			return true;
		}
	};

	//"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"

	const comicsFiltered = comicsList.filter(checkImageAvailabilty);
	const comics = comicsFiltered.slice(0, 3);

	const comicsToRender = comics.map(
		({ id, title, pageCount, prices, thumbnail, urls }) => {
			const { url } = urls[0];
			const { price } = prices[0];

			return (
				<Comic
					key={id}
					name={title}
					pagecount={pageCount}
					price={price}
					url={url}
					thumbnail={thumbnail}
				/>
			);
		},
	);

	return (
		<div className={style.character}>
			<div className={style.character_card}>
				<img src={imgSrc} alt="character-img" className="character-img" />

				<div className={style.details}>
					<h2>{name}</h2>
					<p>{description}</p>
					<a href={url} target="_blank" rel="noreferrer">
						Go to Marvel Page
					</a>
				</div>
			</div>

			<h3>Comic Section</h3>
			<div className={style.comic_panel}>{comicsToRender}</div>
		</div>
	);
}

export default Character;
