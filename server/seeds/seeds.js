const Models = require("../models");
const connection = require("../config/connection");
const seed = [
	{
		__type: Models.User,
		__id: "seller",
		displayName: "John Doe",
		email: "seller@example.com",
		password: `Test1234!`,
		purchasedItems: [],
		sellingItems: [],
		bookmarkedItems: [],
		purchasedItems: [],
		chats: [],
	},
	{
		__type: Models.User,
		__id: "buyer",
		displayName: "Jane Doe",
		email: "buyer@example.com",
		password: `Test1234!`,
		purchasedItems: [],
		bookmarkedItems: [],
		sellingItems: [],
		purchasedItems: [],
		chats: [],
	},
	{
		__addTo: ["seller.chats", "buyer.chats"],
		__type: Models.Chat,
		__id: "chat-1",
		visibleTo: [
			{
				__ref: "seller",
			},
			{
				__ref: "buyer",
			},
		],
		messages: [
			{
				from: {
					__ref: "buyer",
				},
				message: "Hello, I'm interested in your item!",
				timestamp: "2021-01-01",
				offer: 10.0,
			},
			{
				from: {
					__ref: "seller",
				},
				message: "Hello, I'm interested in your item!",
				timestamp: "2021-01-01",
				offer: 10.0,
			},
		],
	},
	{
		__type: Models.Tag,
		__id: "tag-1",
		name: "Test Tag 1",
		color: "#000000",
	},
	{
		__type: Models.Tag,
		__id: "tag-2",
		name: "Test Tag 2",
		color: "#000000",
	},
	{
		__type: Models.Tag,
		__id: "tag-3",
		name: "Test Tag 3",
		color: "#000000",
	},
	{
		__id: "item-1",
		__addTo: ["seller.sellingItems", "buyer.bookmarkedItems"],
		__type: Models.Item,
		title: "Test Item 1",
		photos: ["https://via.placeholder.com/150"],
		Location: "Test Location 1",
		datePosted: "2021-01-01",
		ask: 10.0,
		tags: [
			{
				__ref: "tag-1",
			},
			{
				__ref: "tag-2",
			},
		],
	},
	{
		__id: "item-2",
		__addTo: ["seller.sellingItems"],
		__type: Models.Item,
		title: "Test Item 2",
		photos: ["https://via.placeholder.com/150"],
		Location: "Test Location 2",
		datePosted: "2021-01-01",
		ask: 10.0,
		tags: [
			{
				__ref: "tag-1",
			},
			{
				__ref: "tag-3",
			},
		],
	},
	{
		__id: "item-3",
		__addTo: ["buyer.purchasedItems"],
		__type: Models.Item,
		title: "Test Item 3",
		photos: ["https://via.placeholder.com/150"],
		Location: "Test Location 3",
		datePosted: "2021-01-01",
		ask: 10.0,
		tags: [
			{
				__ref: "tag-2",
			},
			{
				__ref: "tag-3",
			},
		],
	},
];
const ignoredKeys = ["__type", "__id", "__addTo", "__ref"];
const lookups = {};
function resolveRefs(o) {
	if (o.__ref) {
		return lookups[o.__ref];
	}
	for (const key in o) {
		if (ignoredKeys.includes(key)) continue;
		if (o[key] && typeof o[key] === "object") {
			o[key] = resolveRefs(o[key]);
		}
	}
	return o;
}
const toSave = [];
function performSetAtPath(obj, path, value) {
	new Function("obj", "value", `obj.${path} = value`)(obj, value);
}
function performPushAtPath(obj, path, value) {
	new Function("obj", "value", `obj.${path} = [...obj.${path},value];`)(obj, value);
}
function performGetAtPath(obj, path) {
	return new Function("obj", `return obj.${path}`)(obj);
}
for (const item of seed) {
	resolveRefs(item);
	if (item.__type) {
		const model = new item.__type(item);
		lookups[item.__id] = model;
		if (item.__addTo) {
			for (const path of item.__addTo) {
				const [parent, ...loc] = path.split(".");
				let cpath = loc.join(".");
				const parentModel = lookups[parent];
				const value = performGetAtPath(parentModel, cpath);
				if (Array.isArray(value)) {
					performPushAtPath(parentModel, cpath, model);
				} else {
					performSetAtPath(parentModel, cpath, model);
				}
			}
		}
		toSave.push(model);
	}
}

async function seedDatabase() {
	await connection.dropDatabase();
	// await connection.dropDatabase(); ({ force: true });
	for (const model of toSave) {
		await model.save();
	}
	console.log("Database seeded!");
	await connection.close();
	console.log("Connection closed!");
}
console.log("Seeding database...");
seedDatabase();
