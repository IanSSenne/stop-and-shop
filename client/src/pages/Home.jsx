import React from "react";
// import AllItems from "../components/AllItems";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../utils/queries";
import Item from "../components/Item";
import BpNavbar from "../components/NavBar";

export const Home = () => {
	const { loading, data } = useQuery(QUERY_ALL_ITEMS);
	return (
		<>
			<BpNavbar />

			{loading ? <h1>loading...</h1> : data.items.map((item) => <Item {...item} key={item._id} />)}
		</>
	);
};
