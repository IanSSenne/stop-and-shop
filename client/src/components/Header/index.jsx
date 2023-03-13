import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";
import Navbar from "../NavBar";

function Header() {
	return (
		<header>
			
			<div>
				<Link to="/">
					<h1>Stop-n-Shop</h1>
				</Link>
			</div>
			<Navbar/>
		</header>

	);
}

export default Header;
