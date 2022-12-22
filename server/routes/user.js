const express = require('express')
const userRouter = express.Router()
const {userList, registerUser, loginUser, checkLogin, searchUser, userTaskList, updateUserProfile, updateUserStatus, updateUserWorkMode, logoutUser, deleteUser, findUser} = require("../controllers/userController")

// Middleware
const {getUser} = require('../middleware/getUser')
const {protect} = require('../middleware/protect')
// const {auth} = require('../middleware/auth')

// Routes
userRouter.get('/userlist', userList)
userRouter.post('/register', registerUser) // session required (done)
userRouter.post('/login', loginUser) // session required (done)
userRouter.get('/checklogin', protect, checkLogin) // session required (done)
userRouter.get('/search', protect, searchUser) // session required (done)
userRouter.get('/tasks', protect, userTaskList) // session required (done)
userRouter.patch('/updateprofile', protect, updateUserProfile) // session required (done)
userRouter.patch('/updatestatus', protect, updateUserStatus) // session required (done)
userRouter.patch('/updateworkmode', protect, updateUserWorkMode) // session required (done)
userRouter.post('/logout', logoutUser) // session required (done)
userRouter.delete('/delete/:id', getUser, deleteUser)
userRouter.get('/finduser/:id', getUser, findUser)

module.exports = userRouter;