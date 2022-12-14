const bcrypt = require('bcrypt')
const User = require('../models/user')
const Task = require('../models/task')

// Seed data
const userData = require('../seedData/userData')
const taskData = require('../seedData/taskData')

const seedData = async (req, res) => {

    // User collection
    try {
        await User.deleteMany({})
        userData.forEach((user) => {
            user.password = bcrypt.hashSync(user.password, 10)
        })
        await User.create(userData)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    try {
        const userAnam = await User.findOne({name: "Anam"}).exec()
        const userBenjamin = await User.findOne({name: "Benjamin"}).exec()
        const userCassie = await User.findOne({name: "Cassie"}).exec()
        const userDevi = await User.findOne({name: "Devi"}).exec()
        const userEric = await User.findOne({name: "Eric"}).exec()
        const userFaith = await User.findOne({name: "Faith"}).exec()
        const userGerald = await User.findOne({name: "Gerald"}).exec()
        const userHayati = await User.findOne({name: "Hayati"}).exec()
        const userIndra = await User.findOne({name: "Indra"}).exec()
        const userJake = await User.findOne({name: "Jake"}).exec()

        // Task collection
        try {
            // Task 1 (attendees: all)
            taskData[0].createdBy = userDevi._id
            taskData[0].attendees = [
                userAnam._id, 
                userBenjamin._id, 
                userCassie._id, 
                userDevi._id,
                userEric._id,
                userFaith._id,
                userGerald._id,
                userHayati._id,
                userIndra._id,
                userJake._id
            ]
            
            // Task 2 (attendees: all)
            taskData[1].createdBy = userDevi._id
            taskData[1].attendees = [
                userAnam._id, 
                userBenjamin._id, 
                userCassie._id, 
                userDevi._id,
                userEric._id,
                userFaith._id,
                userGerald._id,
                userHayati._id,
                userIndra._id,
                userJake._id
            ]

            // Task 3 (attendees: visuals department)
            taskData[2].createdBy = userBenjamin._id
            taskData[2].attendees = [
                userAnam._id,
                userBenjamin._id,
                userCassie._id
            ]

            await Task.deleteMany({})
            await Task.create(taskData)
            res.status(201).json({ message: 'Database seeding successful'})

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = seedData