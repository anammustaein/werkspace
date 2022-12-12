const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    workingHours: {
        type: String,
        required: true
    },
    workMode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel