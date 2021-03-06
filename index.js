const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
app.set("port", process.env.PORT || 3030);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/lists", async (req, res) => {
	try {
		const results = await db.getAllLists();
		res.send(results);
	} catch (err) {
		console.log(err.message);
	}
});

app.post("/api/lists", async (req, res) => {
	try {
		const newList = req.body;
		const results = await db.addList(newList);
		res.json(results);
	} catch (err) {
		console.log("Unexpected error", err);
	}
});

app.put("/api/lists/:listId", async (req, res) => {
	try {
		await db.addTodoList(req.body, req.params.listId);
		res.end();
	} catch (err) {
		console.log("Unexpected error", err);
	}
});

app.put("/api/lists/todo/:listId", async (req, res) => {
	try {
		await db.updateTodo(req.body, req.params.listId);
		res.end();
	} catch (err) {
		console.log("Unexpected error", err);
	}
});

app.delete("/api/lists/:listId", async (req, res) => {
	try {
		const results = await db.deleteTodo(req.params.listId);
		res.status(204).json(results);
	} catch (err) {
		console.log("Unexpected error", err);
	}
});

app.listen(app.get("port"), () => {
	console.log("Node app is running on port", app.get("port"));
});
