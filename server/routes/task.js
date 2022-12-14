const express = require('express')
const taskRouter = express.Router()
const {taskList, createTask, editTask, deleteTask, editTaskById, deleteTaskById} = require("../controllers/taskController")

// Middleware
const {getTask} = require("../middleware/getTask")
const {protect} = require('../middleware/protect')

// Routes
taskRouter.get('/', taskList)
taskRouter.post('/create', protect, createTask) // session required (done)
taskRouter.patch('/edit', protect, editTask) // session required
taskRouter.delete('/delete', protect, deleteTask) // session required

// Admin routes (for testing purposes)
taskRouter.patch('/edit/:id', getTask, editTaskById)
taskRouter.delete('/delete/:id', getTask, deleteTaskById)

module.exports = taskRouter;