const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Item, Tag } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate({
					path: "item",
					populate: "tag",
				});
			}
		},
		items: async () => Item.find().populate("tags"),
		item: async (parent, { _id }) => {
			return await Item.findById(_id);
		},
		tags: async () => {
			return Tag.find();
		},
		tag: async (parent, { tagId }) => {
			return await Tag.findById(tagId);
		},
		chats: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate({
					path: "chats",
					populate: {
						path: "visibleTo",
					},
				});
				return user.chats;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		chat: async (parent, { chatId }, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate("chats");
				const chat = user.chats.find((chat) => chat._id == chatId);
				return chat;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
	},
	Mutation: {
		async addUser(parent, { username, email, password }, context) {
			const user = await User.create({ displayName: username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		async addItem(parent, { title, photo, location, date, ask }, context) {
			const item = await Item.create({ title, photo, location, date, ask });
		},
		async login(parent, { email, password }) {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError("No user found with this email address");
			}
			const isCorrectPassword = user.isCorrectPassword(password);
			if (!isCorrectPassword) {
				throw new AuthenticationError("Incorrect credentials");
			}
			const token = signToken(user);
			return { token, user };
		},
		async removeItem(parent, { itemId }) {
			return Item.findOneAndDelete({ _id: itemId });
		},
	},
};

module.exports = resolvers;
