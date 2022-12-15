require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require("express-session")
const path = require('path')

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

// Mongoose connection
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
app.use(
    session({
      secret: process.env.SECRET,
      resave: false, 
      saveUninitialized: true,
    })
  );

// User router
const userRouter = require('./routes/user')
app.use('/api/user', userRouter)

// Task router
const taskRouter = require('./routes/task')
app.use('/api/task', taskRouter)

// Seed data
const seedData = require('./controllers/seedDataController')
app.post('/seed', seedData)

// Connect to front end
app.get("/*", (req, res) => {
  res.sendFile(path.resolve('../client/index.html'));
});

app.listen(PORT, () => console.log('Server started'))