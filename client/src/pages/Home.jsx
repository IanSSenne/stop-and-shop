import React from "react";
// import AllItems from "../components/AllItems";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../utils/queries";
import Item from "../components/Item";
import styles from "./Home.module.scss"

import Header from "../components/Header";

export const Home = () => {
	const { loading, data } = useQuery(QUERY_ALL_ITEMS);
	console.log(data);
	return (
		<>
			<Header className={styles.root}/>

			{loading ? <h1>loading...</h1> : data.items.map((item) => <Item {...item} key={item._id} />)}
		</>
	);
};
