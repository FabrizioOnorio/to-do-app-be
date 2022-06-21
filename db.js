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

const updateList = async (newItem, listId) => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");
	const query = { listId };
	const result = await collection.updateOne(query, {
		$push: { items: newItem },
	});
	await client.close();
	return result;
};

const updateTodo = async (item, listId) => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");
	const query = { listId };
	const result = await collection.findOne(query);
	const todos = result.items;
	const todo = todos.find((todo) => todo.itemId === item.itemId);
	const todoIndex = todos.indexOf(todo);
	todos.splice(todoIndex, 1, item);
	const update = await collection.updateMany(query, { $set: { items: todos } });
	await client.close();
	return result;
};

module.exports.addList = addList;
module.exports.getAllLists = getAllLists;
module.exports.updateList = updateList;
module.exports.updateTodo = updateTodo;
