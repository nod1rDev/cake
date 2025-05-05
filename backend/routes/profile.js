import express from 'express'
import auth from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/pofile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password')
        req.json(user)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

export default router