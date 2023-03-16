import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileInput, FormGroup, InputGroup, TextArea, ButtonGroup, Button, TagInput } from "@blueprintjs/core";
import { ADD_ITEM } from "../../utils/mutations";
import { z } from "zod";

import { Cloudinary } from "@cloudinary/url-gen";
import * as x from "@cloudinary/react";
import { showWidget } from "./cloudinaryWidget";

function CreateForm() {
	const navigator = useNavigate();
	const [createNewItem, { loading: creatingItem }] = useMutation(ADD_ITEM);

	const [images, setImages] = useState([]);
	
	const [tags, setTags] = useState([]);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [location, setLocation] = useState("");


	
	const navigate = useNavigate();
	function saveItem(event) {
		event.preventDefault();
		if(event.nativeEvent.submitter.type !== "submit")return;

		const createFormValidator = z.object({
			price: z.number(),
			tags: z.string(),
		});
		const formData = new FormData(event.target.value);
		// TODO: figure out cloudinary

		console.log("files", formData.get("images"));
		const itemData = {
			title,
			description,
			ask:price,
			tags,
			location,
			images,
		};
		console.log(itemData)
		createNewItem({
			variables: itemData,
		}).then((res) => {
			console.log(res);
			navigate("/view/"+res.data.addItem._id);
		});
	}

	return (
		<>
			<h1> Create Form</h1>
			<FormGroup>
				<form onSubmit={saveItem}>
					<h3>Item Title</h3>
					<InputGroup name="title" placeholder="Enter the title of your new item..." type="text" value={title} onChange={(e) => {
						setTitle(e.target.value);
					}} />
					<h3>Item Price</h3>
					<InputGroup name="price" placeholder="Enter the price of your new item..." type="number" min={0} value={price} onChange={e => {
						setPrice(Number(e.target.value));
					}} />
					<h3>Item Description</h3>
					<TextArea name="description" placeholder="Description..." type="text" value={description} onChange={e => setDescription(e.target.value)} />
					<h3>Tags</h3>
					<TagInput name="tags" placeholder="Add tags..." values={tags} onChange={(e) => {
						setTags(e);
					}}/>
					<h3>Location</h3>
					<InputGroup name="location" placeholder="Enter your location..." type="text" value={location} onChange={e => setLocation(e.target.value)} />
					<h3>Add Item Images</h3>
					<Button type="button" className="btn btn-primary" onClick={() => {
						showWidget((error,{ event, info }) => {
							if (event === "success") {
								setImages((images) => [...images, info.secure_url])
							}
						})
					}}>Upload Images...</Button>
					<h3>Sell Your New Item</h3>
					<Button type="submit" text="CONFIRM" rightIcon="tick" />
				</form>
			</FormGroup>
		</>
	);
}

export default CreateForm;
