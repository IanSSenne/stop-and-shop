import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { localStorageKey } from "../contexts/Auth";

const http = createHttpLink({
	uri: "/graphql",
});

const auth = setContext((_, { headers }) => {
	const token = localStorage.getItem(localStorageKey);
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

export const client = new ApolloClient({
	link: auth.concat(http),
	cache: new InMemoryCache(),
});
