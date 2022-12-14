const protect = async (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({
            message: 'User not authorized'
        })
        return
    }
    req.body.userId = req.session.userId
    next()
}

module.exports = {protect}