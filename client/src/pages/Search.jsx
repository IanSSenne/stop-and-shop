import { Button, FormGroup, InputGroup, TagInput } from "@blueprintjs/core";
import React from "react";
import Header from "../components/Header";
export const Search = () => {
	const [tags, setTags] = React.useState([]);
	const [query, setQuery] = React.useState("");
	return (
		<>
			<Header />
			<form>
				<FormGroup label="Search">
					<InputGroup
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
						}}></InputGroup>
				</FormGroup>
				<FormGroup label="Tags">
					<TagInput
						values={tags}
						onChange={(values) => {
							setTags(values);
						}}></TagInput>
				</FormGroup>
				<Button type="submit">Search</Button>
			</form>
		</>
	);
};
