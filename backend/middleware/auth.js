import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const auth = (req, res) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({ msg: 'no token, authorization denied' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}

export default auth