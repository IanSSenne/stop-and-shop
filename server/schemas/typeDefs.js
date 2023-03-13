const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Item {
		_id: ID
		title: String
		photos: [String]
		location: String
		datePosted: String
		ask: Float
		tags: [Tag]
	}

	type User {
		_id: ID
		bookmarkedItems: [Item]
		sellingItems: [Item]
		purchasedItems: [Item]
		displayName: String
		email: String
		chats: [Chat]
		interests: [Tag]
	}

	type Chat {
		_id: ID
		visibleTo: [User]
		messages: [ChatMessage]
	}

	type ChatMessage {
		from: User
		message: String
		timestamp: String
		offer: Float
	}

	type Tag {
		_id: ID
		name: String
		color: String
	}

	type Query {
		item(_id: ID): Item
		items: [Item]
		tags: [Tag]
		user: User
		tag(tagId: ID): Tag
		chats: [Chat]
		chat(chatId: ID): Chat
    sellingitems: [Item]
	}

	type Auth {
		user: User
		token: String
	}
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		addItem(title: String, photos: [String], Location: String, datePosted: String, ask: Float): Item
		login(email: String!, password: String!): Auth
		removeItem(itemId: ID): Item
		sendMessage(chatId: ID, message: String): String
	}
`;

module.exports = typeDefs;
