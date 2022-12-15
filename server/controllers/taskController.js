const Task = require('../models/task')
const User = require('../models/user')

// Show all tasks
const taskList = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Create task
const createTask = async (req, res) => {
    // Ensure ID of user is tagged to the task they created
    const userId = req.session.userId
    const user = await User.findById(userId)

    const task = new Task({
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        location: req.body.location,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        createdBy: user._id,
        attendees: req.body.attendees
    })
    try {
        const title = task.title
        const type = task.type
        const location = task.location
        const startTime = task.startTime
        const endTime = task.endTime
        const attendees = task.attendees

        // Check for empty fields
        if ((!title) || (!type) || (!location) || (!startTime) || (!endTime) || (!attendees)) {
            res.status(400).json({
                message: 'Required fields cannot be empty'
            })
            return
        }

        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Edit task
const editTask = async (req, res) => {
    const taskId = req.body._id
    const title = req.body.title
    const description = req.body.description
    const location = req.body.location
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const attendees = req.body.attendees

    const task = await Task.findById(taskId)
    const userId = req.session.userId
    const taskCreatorId = task.createdBy

    try {
        // Check if logged in user is task creator
        // Only creators can edit the task
        if (userId != taskCreatorId) {
            res.status(401).json({
                message: 'Task can only be edited by the creator'
            })
            return
        }

        // Check for empty fields
        if ((!title) || (!location) || (!startTime) || (!endTime) || (!attendees)) {
            res.status(400).json({
                message: 'Required fields cannot be empty'
            })
            return
        }

        task.title = title
        task.description = description
        task.location = location
        task.startTime = startTime
        task.endTime = endTime
        task.attendees = attendees

        await task.save()
        res.status(202).json({
            message: 'Task edited successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// Delete task
const deleteTask = async (req, res) => {
    const taskId = req.body._id
    const task = await Task.findById(taskId)
    const userId = req.session.userId
    const taskCreatorId = task.createdBy

    try {
        // Check if logged in user is task creator
        // Only creators can delete the task
        if (userId != taskCreatorId) {
            res.status(401).json({
                message: 'Not authorized'
            })
            return
        } else {
            await Task.findByIdAndDelete(taskId)
        }

        if (task === null) {
            res.status(400).json({
                message: 'Incorrect task ID'
            })
            return
        }

        res.status(200).json({
            message: 'Task deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// Edit task by ID
const editTaskById = async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title
    }
    if (req.body.description != null) {
        res.task.description = req.body.description
    }
    if (req.body.location != null) {
        res.task.location = req.body.location
    }
    if (req.body.startTime != null) {
        res.task.startTime = req.body.startTime
    }
    if (req.body.endTime != null) {
        res.task.endTime = req.body.endTime
    }
    if (req.body.createdBy != null) {
        res.task.createdBy = req.body.createdBy
    }
    if (req.body.attendees != null) {
        res.task.attendees = req.body.attendees
    }
    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Delete task by ID
const deleteTaskById = async (req, res) => {
    try {
        await res.task.remove()
        res.status(200).json({ 
            message: 'Successfully deleted task' 
        })
    } catch (err) {
        res.status(500).json({ 
            message: err.message 
        })
    }
}

module.exports = {taskList, createTask, editTask, deleteTask, editTaskById, deleteTaskById}