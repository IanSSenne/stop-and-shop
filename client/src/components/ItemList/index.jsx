import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../../utils/queries";

function ItemList() {
	const [state, dispatch] = useStoreContext();
	const { currentCategory } = state;
	const { loading, data } = useQuery(QUERY_ALL_ITEMS);

	// return (
	//     <div>
	//         <h2>Items For Sale:</h2>
	//         {State.items.length ? (
	//             <div>
	//         )}
	//     </div>
	// );
}
