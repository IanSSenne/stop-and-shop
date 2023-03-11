import React from "react";
import { Navbar, Button, Alignment } from "@blueprintjs/core";

function BpNavbar() {
	return (
		<Navbar>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>Blueprint</Navbar.Heading>
				<Navbar.Divider />
				<Button className="bp4-minimal" icon="home" text="Home" />
				<Button className="bp4-minimal" icon="document" text="Profile" />
				<Button className="bp4-minimal" icon="document" text="Create New Listing" />
				<Button className="bp4-minimal" icon="document" text="Search" />
			</Navbar.Group>
		</Navbar>
	);
}
export default BpNavbar;
