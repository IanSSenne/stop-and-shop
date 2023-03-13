import { useAuth } from "../../contexts/Auth";
export function wrapAuthenticationCheck(Component) {
	return function WrappedAuthenticationCheckComponent({ is, fallback = null, ...passonProps }) {
		const auth = useAuth();
		if (auth.user) {
			return <Component {...passonProps} />;
		}
		return fallback;
	};
}
