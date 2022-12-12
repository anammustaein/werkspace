const Task = require('../models/task')

// Middleware for routes that uses task id
async function getTask(req, res, next) {
    let task
    try {
      task = await Task.findById(req.params.id)
      if (task == null) {
        return res.status(404).json({ message: 'Task not found' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.task = task
    next()
  }

  module.exports = {getTask}