import React from "react";
// import Item from "../components/Item";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_ITEM } from "../utils/queries";
import Header from "../components/Header";

export const ItemDesc = () => {
	let { id } = useParams();
	const { loading, data } = useQuery(QUERY_SINGLE_ITEM, { variables: { id } });
	console.log(data);
	return (
		<>
			<Header />
			{!loading && (
				<div>
					{/* Title, Ask, Location, datePosted, photo img */}
					<h1>{data.item.title}</h1>
					<p>{data.item.ask}</p>
					<p>{data.item.location}</p>
					<p>{data.item.datePosted}</p>
					{/* <p>{data.item.photos}</p> */}
					<img src={data.item.photos} />
				</div>
			)}
		</>
	);
};
