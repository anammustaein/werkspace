const Task = require('../models/task')

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
    const task = new Task({
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        location: req.body.location,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        createdBy: req.body.createdBy,
        attendees: req.body.attendees
    })
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Update task
const updateTask = async (req, res) => {
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

// Delete task
const deleteTask = async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: 'Successfully deleted task'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {taskList, createTask, updateTask, deleteTask}