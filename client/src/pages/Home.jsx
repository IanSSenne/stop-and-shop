import React from "react";
// import AllItems from "../components/AllItems";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_ITEMS } from "../utils/queries";

export const Home = () => {
	const { loading, data } = useQuery(QUERY_ALL_ITEMS);
	return (loading ? <h1>loading...</h1>:
	data.items.map((item) => (
			<div key={item._id}>
				{/* title not showing */}
				<p>Product: {item.title} 
				</p>
				<p>Price: ${item.ask} 
				</p>
				<p>Photos: <img src={item.photos[0]} />
				</p>
				{/* convert to actual date */}
				<p>Date Posted: {item.datePosted} 
				</p>
				<p>Location: {item.location} 
				</p>


			</div>
		))
	
	);
};
