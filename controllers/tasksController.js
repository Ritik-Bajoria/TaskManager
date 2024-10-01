const Task = require('../models/tasks');

// TO add tasks to Task collection 
exports.addTasks = async (req, res) => {

    // get the data entered by the user from request object
    const body = req.body;

    // check if the user has logged in or not if not then redirect to login
    if (req.session.userId == null) {
        res.redirect('/api/user/login');
    }

    // Insert the data to our mongoDB database
    const result = Task.create({
        userid: req.session.userId,
        taskTitle: body.taskName,
        taskDescription: body.taskDescription,
        taskStatus: body.taskStatus,
        taskDueDate: body.taskDueDate,
        taskStartDate: body.taskStartDate
    });

    // Refresh tasks again after adding task is done to display the new tasks
    res.redirect('/api/user/tasks');
}

// TO get tasks as per his/her userId
exports.getTasks = async (req, res) => {
    // check if the user has logged in or not if not then redirect to login
    if (req.session.userId != null) {
        // if logged in then get the user's tasks from the database
        const tasks = await Task.find({ userid: req.session.userId });
        res.render('../views/tasks.ejs', { tasks }); // Passing tasks to EJS
    } else {
        return res.redirect('/api/user/login');
    }
};

exports.editTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTaskData = req.body;

        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Return the updated task data
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTaskById = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(404).send("Error Task not found");
    } else {
        return res.status(203).json("task deleted successfully");
    }
}