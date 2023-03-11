import React, { createContext, useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import decode from "jwt-decode";

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

const LOGIN_MUTATION = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      displayName
			_id
			email
    }
    token
  }
}
`;
export const localStorageKey = "auth_token";
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem(localStorageKey) || null);
	const [user, setUser] = useState(token && token !== 'undefined' && decode(token));
	const [loginMutation,{data,error,loading}] = useMutation(LOGIN_MUTATION);


	const login = ({ email, password }) => {
		return loginMutation({
			variables: {
				email,
				password,
			},
		}).then(({ data: { login: { user,token} } }) => {
			setUser(user);
			setToken(token);
			localStorage.setItem(localStorageKey, token);
		});
	};

	const logout = () => {
		localStorage.removeItem(localStorageKey);
		setUser(null);
	};

	const state = {
		user,
		isAuthenticated: !!user,
		login,
		logout,
		error,
		loading
	};

	return <authContext.Provider value={state}>{children}</authContext.Provider>;
};
