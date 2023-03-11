import React from "react";
import UserItems from "../components/UserItems";
import Bookmarked from "../components/Bookmarked";

export const Profile = () => {
	return (
		(
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
		)
	);
};
