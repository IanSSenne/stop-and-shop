import React from "react";
import styles from "./NavBar.module.scss"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import { useAuth } from "../../contexts/Auth";

function BpNavbar() {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const auth = useAuth();
	return (
		<Navbar>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>
					<Button minimal={true} onClick={() => navigate("/")}>
						<strong style={{ fontSize: "1.5rem" }}>Stop-n-Shop</strong>
					</Button>
				</Navbar.Heading>
				<Navbar.Divider />
				<Link to="/">
					<Button className="bp4-minimal" icon="home" text="Home" />
				</Link>
				<Link to="/profile">
					<Button className="bp4-minimal" icon="person" text="Profile" />
				</Link>
				<Link to="/create">
					<Button className="bp4-minimal" icon="plus" text="Create New Listing" />
				</Link>
				<Link to="/search">
					<Button className="bp4-minimal" icon="search" text="Search" />
				</Link>
			</Navbar.Group>

			<Navbar.Group align={Alignment.RIGHT}>
				{auth.user ? (
					<Button
						onClick={() => {
							auth.logout();
						}}
						rightIcon={"log-out"}
						minimal>
						Logout
					</Button>
				) : (
					<Link to={`/login?return=${location}`}>
						<Button minimal icon="log-in" text="Login" />
					</Link>
				)}
			</Navbar.Group>
		</Navbar>
	);
}
export default BpNavbar;
