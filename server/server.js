require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require("express-session")
const cors = require("cors")
const path = require('path')
// const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

// Mongoose connection
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
app.use(cors())
app.use(
    session({
      secret: process.env.SECRET,
      resave: false, 
      saveUninitialized: true,
    })
  );
app.use(cookieParser())

// User router
const userRouter = require('./routes/user')
app.use('/api/user', userRouter)

// Task router
const taskRouter = require('./routes/task')
app.use('/api/task', taskRouter)

// Seed data
const seedData = require('./controllers/seedDataController')
app.post('/seed', seedData)

app.listen(PORT, () => console.log('Server started'))