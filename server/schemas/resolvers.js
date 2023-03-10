const { AuthenticationError } = require("apollo-server-express");
const { User, Chat, Item, Tag } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	// Query: {
	//     user: async (parent, args, context) => {
	//         if (context.user) {
	//             const user = await User.findById(context.user._id)
	//             .populate({
	//             })
	//         }
	//     },
	//     item: async (parent, )
	// },
	Mutation: {
		async addUser(parent, { username, email, password }, context) {
			const user = await User.create({ displayName: username, email, password });
			const token = signToken(user);
			return { token, user };
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
	},
};

module.exports = resolvers;
