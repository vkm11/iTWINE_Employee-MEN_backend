const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./models/todoList")

var app = express();
app.use(cors());
app.use(express.json());

// Connect to your MongoDB database (replace with your database URL) 
mongoose.connect(`mongodb+srv://vijay1111mane:RW7MwYCopPqVokLR@cluster0.r0bfj9v.mongodb.net`);
;

// this is new mongodb url
// mongodb + srv://vijay1111mane:RW7MwYCopPqVokLR@cluster0.r0bfj9v.mongodb.net/

// Check for database connection errors 
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

// Get saved tasks from the database 
app.get("/getTodoList", (req, res) => {
    TodoModel.find({})
        .sort({ _id: -1 }) 
        .then((todoList) => res.json(todoList))
        .catch((err) => res.json(err))
});

// Add new task to the database 
app.post("/addTodoList", (req, res) => {
    TodoModel.create({
        name: req.body.name,
        task: req.body.task,
        startdate: req.body.startdate,
        status: req.body.status,
        deadline: req.body.deadline,
        photo: req.body.photo
    })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

// Update task fields (including deadline) 
app.post("/updateTodoList/:id", (req, res) => {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
        task: req.body.task,
        startdate: req.body.startdate,
        status: req.body.status,
        deadline: req.body.deadline,
        photo: req.body.photo
    };
    TodoModel.findByIdAndUpdate(id, updateData)
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

// Delete task from the database 
app.delete("/deleteTodoList/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete({ _id: id })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});

app.listen(3001, () => {
    console.log('Server running on 3001');
}); 