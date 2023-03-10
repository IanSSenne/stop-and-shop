const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
    Message: [
        {
            from: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    visibleTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})


const Chat = model('Chat', chatSchema);

module.exports = Chat;