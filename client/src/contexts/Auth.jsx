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
const SIGNUP_MUTATION = gql`
mutation Mutation($email: String!, $password: String!, $displayName: String!) {
	addUser(email: $email, password: $password, username: $displayName) {
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
	const [loginMutation, { error:logInError, loading: loginLoading }] = useMutation(LOGIN_MUTATION);
	const [signUpMutation, { error: signUpError, loading: signUpLoading }] = useMutation(SIGNUP_MUTATION);


	const login = ({ email, password }) => {
		return loginMutation({
			variables: {
				email,
				password,
			},
		}).then(
			({
				data: {
					login: { user, token },
				},
			}) => {
				setUser(user);
				setToken(token);
				localStorage.setItem(localStorageKey, token);
			}
		);
	};

	const signUp = ({ email, password, displayName }) => {
		return signUpMutation({
			variables: {
				email,
				password,
				displayName,
			},
		}).then(({ data: { addUser: { user, token } } }) => { 
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
		signUp,
		error: logInError || signUpError,
		loading: loginLoading || signUpLoading,
	};

	return <authContext.Provider value={state}>{children}</authContext.Provider>;
};
