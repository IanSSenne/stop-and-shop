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
	// Mutation: {
	// }
};

module.exports = resolvers;
