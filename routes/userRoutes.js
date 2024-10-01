const express = require('express');
const router = express.Router();
require('dotenv').config();
const userController = require('../controllers/userController');
const auth = require('../controllers/auth');
const taskController = require('../controllers/tasksController');

// Routes to login
router.route('/login')
    .get(auth.getLogin)
    .post(auth.userLoginController);

//routes to user
router.route('/signup')
    .get(auth.getSignUp)
    .post(auth.userSignUpController);

//route for getting all users form the database
router.route('/')
    .get((userController.getAllUsers));

//routes to user as per id for CRUD operations
router.route('/find/:id')
    .get(userController.findUserById)
    .patch(userController.updateUserById)
    .delete(userController.deleteUserById);

//routes to tasks 
router.route('/tasks')
    .get(taskController.getTasks)
    .post(taskController.addTasks);

router.route('/tasks/:id')
    .patch(taskController.editTaskById)
    .delete(taskController.deleteTaskById);

module.exports = router;