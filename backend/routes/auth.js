<<<<<<< HEAD
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { login, register, user, bakers, baker, getBakerById } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';
// import { upload } from '../middleware/upload.js'; 
import multer from 'multer';

dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/login', login);
router.post('/register', upload.single('image'), register);
router.get('/profile', auth, user);
router.get('/bakers', bakers);
router.get('/bakers/:id', getBakerById);
router.get('/:bakerId/products', baker);

export default router;
=======
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
>>>>>>> 13ff719771e129e3621ca181e7d093f72f569213
