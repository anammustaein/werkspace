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

// Register new user
const registerUser = async (req, res) => {
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
            req.session.userId = newUser._id
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// User login
const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await User.findOne({email}).exec()
        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        const loginPass = bcrypt.compareSync(password, user.password)
        if (loginPass) {
            req.session.userId = user._id
            res.status(202).json({ 
                message: 'Login successful',
                id: user._id,
                name: user.name
            })
        } else {
            req.session.userId = null
            res.status(401).json({
                message: 'Password incorrect'
            })
            return
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Search user by id
const searchUser = async (req, res) => {
    try {
        const searchText = req.body.searchText
        const userListRaw = await User.find({
            $or: [{ email: {$regex: searchText} }, { name: {$regex: searchText} }]
        }, null, {limit: 5})
        const userList = userListRaw.map((user) => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                department: user.department,
                designation: user.designation,
                workingHours: user.workingHours,
                workMode: user.workMode,
                status: user.status
            }
        })
        res.status(200).json(userList)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// Show user's task list (by user id)
const userTaskList = async (req, res) => {
    try {
        // const userId = req.params.id
        const userId = req.session.userId
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

// Update user profile
const updateUserProfile = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password, 10)
    const department = req.body.department
    const designation = req.body.designation

    try {
        const userId = req.session.userId
        const user = await User.findById(userId)
        const existingUser = await User.findOne({ email: email })

        // Check for empty fields
        if ((!name) || (!email) || (!password) || (!department) || (!designation)) {
            res.status(400).json({
                message: 'Required fields cannot be empty'
            })
            return
        }

        // Check for existing users with the same email
        if ((existingUser) && user.email != email) {
            res.status(409).json({
                message: 'Email has already been used'
            })
            return
        }

        user.name = name
        user.email = email
        user.password = password
        user.department = department
        user.designation = designation

        await user.save()
        res.status(202).json({
            message: 'Profile updated successfully',
            id: user.id,
            name: user.name
        })
    } catch (err) {
        res.status(500).json({ 
            message: err.message
        })
    }
}

// Update user work status
const updateUserStatus = async (req, res) => {
    const workingHours = req.body.workingHours
    const workMode = req.body.workMode
    const status = req.body.status

    try {
        const userId = req.session.userId
        const user = await User.findById(userId)

        // Check for empty fields
        if ((!workingHours) || (!workMode) || (!status)) {
            res.status(400).json({
                message: 'Required fields cannot be empty'
            })
            return
        }

        user.workingHours = workingHours
        user.workMode = workMode
        user.status = status

        await user.save()
        res.status(202).json({
            message: 'Status updated successfully',
            id: user.id,
            name: user.name
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// User logout
const logoutUser = async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(400).json({ message: 'No user is logged in' })
            return
        }
        req.session.userId = null
        res.status(202).json({ message: 'Logout successful' })
    } catch (err) {
        res.status(500).json({ message: err.message })
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

module.exports = {userList, registerUser, loginUser, searchUser, userTaskList, updateUserProfile, updateUserStatus, logoutUser, deleteUser}