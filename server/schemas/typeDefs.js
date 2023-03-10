const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Item {
        _id: ID 
        title: String
        photos: [String]
        Location: UNKNOWN
        datePosted: DateTime
        ask: Number
        tags: [Tag]
    }

    type User {
        _id: ID 
        bookmarkedItems: [Item]
        sellingItems: [Item]
        purchasedItems: [Item]
        displayName: String
        email: String
        Password: String
        Chats: [Chat]
        Interests: [Tag]
    }

    type Chat {
        _id: ID 
        visibleTo: [User]
        Message: [ChatMessage]
    }

    type ChatMessage{
        from: User,
        message: String
        timestamp: DateTime
        offer: Number
    }

    type Tag {
        _id: ID 
        name: String
        color: String
    }
    type Query {
        item(_id: ID): Item
        

    }
`;

module.exports = typeDefs; 