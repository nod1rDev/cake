import express from 'express'
import dotenv from 'dotenv'
import { login, register, user, bakers, baker } from '../controllers/auth.js'
import { auth } from '../middleware/auth.js'

dotenv.config()

const router = express.Router()
router.post('/login', login)
router.post('/register', register)
router.get('/profile', auth, user)
router.get('/bakers', bakers)
router.get('/bakers/:bakerId', baker)

export default router