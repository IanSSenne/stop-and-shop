const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const clientDeploymentPath = "../client/dist";

if (process.argv.includes("--production")) {
	app.use(express.static(clientDeploymentPath));

	app.get("*", (req, res) => {
		res.sendFile("index.html", { root: clientDeploymentPath });
	});
}

app.listen(PORT, () => {
	console.log("Listening on port", PORT);
});
