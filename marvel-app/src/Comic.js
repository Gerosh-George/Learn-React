import React from "react";
import style from "./comic.module.css";

function Comic({ name, price, url, thumbnail, pagecount }) {
	// API document provides different image size names
	const imgSrc = thumbnail.path + "/portrait_incredible." + thumbnail.extension;

	return (
		<div>
			<div className={style.comic}>
				<div className={style.back}>
					<div className={style.details}>
						<h4>{name}</h4>
						<p>Page Count: {pagecount}</p>
						<p>Price: ${price}</p>
						<a href={url} target="_blank" rel="noreferrer">
							More Info
						</a>
					</div>
				</div>
				<div className={style.front}>
					<img src={imgSrc} alt="comic-img" />
				</div>
			</div>
		</div>
	);
}

export default Comic;
