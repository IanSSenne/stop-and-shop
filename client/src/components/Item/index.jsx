import React from "react";
import { Link } from "react-router-dom";

function Item(item) {
	return (
		<div key={item._id}>
			<p>Product: {item.title}</p>
			<p>Price: ${item.ask}</p>
			<p>
				Photos: <img src={item.photos[0]} />
			</p>
			{/* convert to actual date */}
			<p>Date Posted: {item.datePosted}</p>
			<p>Location: {item.location}</p>
		</div>
	);
}

export default Item;
