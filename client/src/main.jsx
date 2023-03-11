import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import { createBrowserRouter, RouterProvider, useParams, useResolvedPath } from "react-router-dom";
import Index from "./pages";
import Home from "./pages/Home";
function Show(props) {
	const params = useParams();
	const route = useResolvedPath();
	return (
		<>
			<h1>{JSON.stringify(route)}</h1>
			<h2>props={JSON.stringify(props)}</h2>
			<h2>params={JSON.stringify(params)}</h2>
		</>
	);
}
const router = createBrowserRouter([
	{
		path: "/",
		Component: Home,
	},
	{
		path: "/create",
		Component: Show,
	},
	{
		path: "/profile",
		Component: Show,
	},
	{
		path: "/profile/:id",
		Component: Show,
	},
	{
		path: "/edit/:id",
		Component: Show,
	},
	{
		path: "/search",
		Component: Show,
	},
	{
		path: "/login",
		Component: Show,
	},
	{
		path: "/view/:id",
		Component: Show,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
