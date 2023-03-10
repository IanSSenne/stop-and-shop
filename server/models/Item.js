const { Schema, model } = require("mongoose");


const itemSchema = new Schema ({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
    photos: {
        type: [String],
    },
    location: {
        type: String,
    },
    datePosted: {
        type: Date,
    },
    ask: {
        type: Number,
        required: true,
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
});

const Item = model('Item', itemSchema);

module.exports = Item;