const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;

const getAllLists = async () => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");

	const result = await collection.find().toArray();
	await client.close();
	return result;
};

const addList = async (newList) => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");

	const result = await collection.insertOne(newList);
	await client.close();
	return result;
};

module.exports.addList = addList;
module.exports.getAllLists = getAllLists;
