const express = require('express')
const taskRouter = express.Router()
const {taskList, createTask, updateTask, deleteTask} = require("../controllers/taskController")

// Middleware
const {getTask} = require("../middleware/getTask")

// Routes
taskRouter.get('/', taskList)
taskRouter.post('/createtask', createTask)
taskRouter.patch('/update/:id', getTask, updateTask)
taskRouter.delete('/delete/:id', getTask, deleteTask)

module.exports = taskRouter;