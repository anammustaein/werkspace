require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT

mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

// User router
const userRouter = require('./routes/user')
app.use('/user', userRouter)

// Task router
const taskRouter = require('./routes/task')
app.use('/task', taskRouter)

app.listen(PORT, () => console.log('Server started'))