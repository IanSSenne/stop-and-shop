import React from "react";
// import AllItems from "../components/AllItems";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_ITEMS } from "../utils/queries";

export const Home = () => {
	const { loading, data } = useQuery(QUERY_ALL_ITEMS);
	return <div>{JSON.stringify(data)}</div>;
};
