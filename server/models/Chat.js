const { Schema, model } = require("mongoose");
const User = require('./User')

const messageSchema = new Schema({
        from: {
            type: Schema.Types.ObjectId,
            ref: User,
        },
        message:String,
        timestamp: Date,
        offer: Number
})
const chatSchema = new Schema({
    messages: [
        messageSchema
    ],
    visibleTo: {
        type: Schema.Types.ObjectId,
        ref: User,
    }
})


const Chat = model('Chat', chatSchema);

module.exports = Chat;