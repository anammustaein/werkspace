const User = require('../models/user')
const Task = require('../models/task')
const bcrypt = require('bcrypt')

// Show all users
const userList = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Find user by id
const findUser = async (req, res) => {
    res.json(res.user)
}

// Show user's task list (by user id)
const userTaskList = async (req, res) => {
    try {
        const userId = req.params.id // this is retrieved from url. re-write once sessions is implemented
        const taskList = await Task.find({attendees : {$all: [userId]}}, [
            "title", 
            "type", 
            "description",
            "location", 
            "startTime", 
            "endTime",
            "createdBy",
            "attendees"
        ])
        res.status(200).json({taskList})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Create new user
const createUser = async (req, res) => {
    const email = req.body.email;

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        department: req.body.department,
        designation: req.body.designation,
        workingHours: req.body.workingHours,
        workMode: req.body.workMode,
        status: req.body.status
    })

    try {
        // Check if email has been used
        const existingUser = await User.findOne({email}).exec()
        if (existingUser) {
            res.status(409).json({ message: 'Email has already been used' })
            return
        } else {
            const newUser = await user.save()
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Update user
const updateUserProfile = async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.department != null) {
        res.user.department = req.body.department
    }
    if (req.body.designation != null) {
        res.user.designation  = req.body.designation 
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Update user work status
const updateUserStatus = async (req, res) => {
    if (req.body.workingHours != null) {
        res.user.workingHours = req.body.workingHours
    }
    if (req.body.workMode != null) {
        res.user.workMode = req.body.workMode
    }
    if (req.body.status != null) {
        res.user.status = req.body.status
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Delete user
const deleteUser = async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Successfully deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {userList, findUser, userTaskList, createUser, updateUserProfile, updateUserStatus, deleteUser}