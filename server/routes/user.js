const express = require('express')
const userRouter = express.Router()
const {userList, findUser, userTaskList, createUser, updateUserProfile, updateUserStatus, deleteUser} = require("../controllers/userController")

// Middleware
const {getUser} = require("../middleware/getUser")

// Routes
userRouter.get('/', userList)
userRouter.get('/:id', getUser, findUser)
userRouter.get('/:id/tasks', getUser, userTaskList)
userRouter.post('/createuser', createUser)
userRouter.patch('/update/:id', getUser, updateUserProfile)
userRouter.patch('/status/:id', getUser, updateUserStatus)
userRouter.delete('/delete/:id', getUser, deleteUser)

module.exports = userRouter;