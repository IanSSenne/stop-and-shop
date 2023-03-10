const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;
