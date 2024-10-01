const mongoose = require('mongoose');

// Schema
const taskSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    taskTitle: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskDueDate: {
        type: String,
        required: true
    },
    taskStartDate: {
        type: String,
        required: true
    }
}, { timestamps: true });


// Model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;