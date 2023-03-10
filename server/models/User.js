const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
          },
        bookmarkedItems: [
           {
            type: Schema.Types.ObjectId,
            ref: "Item"
           }, 
        ],
        sellingItems: [
            {
            type: Schema.Types.ObjectId,
            ref: "Item"
            }
        ]
    }
);

const User = model('User', userSchema);

module.exports = User;