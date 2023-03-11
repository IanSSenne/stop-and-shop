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
		Password: String
		Chats: [Chat]
		Interests: [Tag]
	}

	type Chat {
		_id: ID
		visibleTo: [User]
		Message: [ChatMessage]
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
	}

	type Auth {
		user: User
		token: String
	}
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
