import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import { createBrowserRouter, RouterProvider, useParams, useResolvedPath } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Create } from "./pages/Create";
import { Search } from "./pages/Search";
import { AuthProvider } from "./contexts/Auth";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apolloClient";
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
		Component: Create,
	},
	{
		path: "/profile",
		Component: Profile,
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
		Component: Search,
	},
	{
		path: "/login",
		Component: Login,
	},
	{
		path: "/view/:id",
		Component: Show,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ApolloProvider>
	</React.StrictMode>
);
