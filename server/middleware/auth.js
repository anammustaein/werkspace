require('dotenv').config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.headers

        // if (!token) {
        //     return res.status(403).json({
        //         message: "No token"
        //     })
        // }

        return res.json({token})

        // const decoded = jwt.verify(token, process.env.SECRET)
        // req.user._id = decoded.user._id
        // next();

    } catch(error) {
        res.status(401).json({
            message: "Not authorized"
        })
    }
}

module.exports = { auth }