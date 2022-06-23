const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const getAllLists = async () => {
	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");
	const result = await collection.find().toArray();
	return result;
};

const addList = async (newList) => {
	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");
	const result = await collection.insertOne(newList);
	return result;
};

const addTodoList = async (newItem, listId) => {
	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");
	const query = { listId };
	const result = await collection.updateOne(query, {
		$push: { items: newItem },
	});
	return result;
};

const updateTodo = async (item, listId) => {
	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");
	const query = { listId };
	const result = await collection.findOne(query);
	const todos = result.items;
	const todo = todos.find((todo) => todo.itemId === item.itemId);
	const todoIndex = todos.indexOf(todo);
	todos.splice(todoIndex, 1, item);
	await collection.updateMany(query, { $set: { items: todos } });
	return result;
};

const deleteTodo = async (listId) => {
	await client.connect();
	const database = client.db("to-do-app");
	const collection = database.collection("lists");
	const query = { listId };
	const result = await collection.deleteOne(query);
	return result;
};

module.exports.addList = addList;
module.exports.getAllLists = getAllLists;
module.exports.addTodoList = addTodoList;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
