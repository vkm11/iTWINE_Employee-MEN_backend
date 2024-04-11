const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    startdate: {
        type: Date,
       
    },
    status: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
    },
    photo: {
        type: String
    },
});


const todoList = mongoose.model("todo", todoSchema);

module.exports = todoList;