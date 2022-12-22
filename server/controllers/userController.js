const User = require('../models/user')
const Task = require('../models/task')
const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken")

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
            res.status(201).json({
                message: 'New user created',
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            })
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
                _id: user._id,
                name: user.name,
                email: user.email
            })

            // const token = jwt.sign({user}, process.env.SECRET)

            // res.status(202).json({
            //     message: 'Login successful',
            //     _id: user._id,
            //     name: user.name,
            //     email: user.email,
            //     token: token
            // })

        } else {
            req.session.userId = null
            res.status(401).json({
                message: 'Password incorrect'
            })
            // res.status(403).json({
            //     message: 'Invalid login'
            // })
            return
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Check user login
const checkLogin = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).exec()
        if (!user) {
            res.status(404).json({
                message: 'No user is logged in'
            })
            return
        }

        res.status(200).json({
            message: 'User logged in',
            _id: user._id,
            name: user.name,
            email: user.email,
            department: user.department,
            designation: user.designation,
            workingHours: user.workingHours,
            workMode: user.workMode,
            status: user.status
        })
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

// Show logged-in user's task list
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
    const workingHours = req.body.workingHours

    try {
        const userId = req.session.userId
        const user = await User.findById(userId)
        const existingUser = await User.findOne({ email: email })

        // Check for empty fields
        if ((!name) || (!email) || (!password) || (!department) || (!designation) || (!workingHours)) {
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
        user.workingHours = workingHours

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
    const status = req.body.status

    try {
        const userId = req.session.userId
        const user = await User.findById(userId)

        // Check for empty fields
        if ((!status)) {
            res.status(400).json({
                message: 'Required field cannot be empty'
            })
            return
        }

        user.status = status

        await user.save()
        res.status(202).json({
            message: 'Status updated successfully',
            id: user.id,
            name: user.name,
            status: user.status
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Update user workMode
const updateUserWorkMode = async (req, res) => {
    const workMode = req.body.workMode

    try {
        const userId = req.session.userId
        const user = await User.findById(userId)

        // Check for empty fields
        if ((!workMode)) {
            res.status(400).json({
                message: 'Required field cannot be empty'
            })
            return
        }

        user.workMode = workMode

        await user.save()
        res.status(202).json({
            message: 'Work mode updated successfully',
            id: user.id,
            name: user.name,
            workMode: user.workMode
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

// Find user by ID
const findUser = async (req, res) => {
    res.json(res.user)
}

module.exports = {userList, registerUser, loginUser, checkLogin, searchUser, userTaskList, updateUserProfile, updateUserStatus, updateUserWorkMode, logoutUser, deleteUser, findUser}