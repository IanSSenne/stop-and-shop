const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3000;
if (process.argv.includes("--production")) {
	process.env.NODE_ENV = "production";
}
const clientDeploymentPath = "../client/dist";
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("INTROSPECTION", process.env.NODE_ENV !== "production");
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
	introspection: process.env.NODE_ENV !== "production",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "*");
		const start = Date.now();
		next();
		console.log(`${req.method} ${req.url} ${Date.now() - start}ms`);
	});
}

if (process.env.NODE_ENV === "production") {
	app.use(express.static(clientDeploymentPath));

	// app.get("*", (req, res) => {
	// 	res.sendFile("index.html", { root: clientDeploymentPath });
	// });
}

app.use(express.static(path.join(__dirname, "public")));

const startApolloServer = async () => {
	await server.start();
	server.applyMiddleware({ app });

	db.once("open", () => {
		app.listen(PORT, () => {
			console.log("Listening on port", PORT);
			console.log(`http://localhost:${PORT}${server.graphqlPath}`);
		});
	});
};

startApolloServer();
