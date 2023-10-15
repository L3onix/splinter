const User = require('../models/User')

async function create(req, res) {
    try {
        const userData = await req.body
        await User.create( req.body ).then((created) => {
            if (!created) return res.status(400)
            res.status(201).json({ success: true, created})
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({success: false, error: error.message})
    }
}

module.exports = {
    create
}