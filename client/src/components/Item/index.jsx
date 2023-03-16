import React from "react";
import styles from "./Item.module.scss"
import { Link } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";

function Item(item) {
	return (
		<Link to={`/view/${item._id}`}>
			<Card className={styles.Card} interactive={true} elevation={Elevation.TWO}>
				<h3 className={styles.title}>{item.title}</h3>
				<p>
					Price: ${item.ask} <br />
					Photos: {item.photos[0]} <br />
					Date Posted: {item.datePosted} <br />
					Location: {item.location} <br />
				</p>
				<Button>Details</Button>
			</Card>
		</Link>
	);
}

export default Item;
