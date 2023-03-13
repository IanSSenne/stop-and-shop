import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import BpNavbar from "../components/NavBar";
import Header from "../components/Header";
import Item from "../components/Item";
// import SellingItems from "../components/SellingItems";

export const Profile = () => {
	const { loading, data } = useQuery(QUERY_USER);
	console.log(data);
	return (
		<>
			<Header />
			<BpNavbar />
			{/* <SellingItems/> */}
			{loading ? <h1>loading...</h1> : data.user.sellingItems.map((item) => <Item {...item} key={item._id} />)}
			{/* Bookmarked Items */}
			{loading ? <h1>loading...</h1> : data.user.bookmarkedItems.map((item) => <Item {...item} key={item._id} />)}
			{/* (
			<div>
				<h2>Your Listings</h2>
				<UserItems />
			</div>
		),
		(
			<div>
				<h2>Bookmarked Listings</h2>
				<Bookmarked />
			</div>
		) */}
		</>
	);
};
