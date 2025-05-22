import express from 'express';
import multer from 'multer';
import path from 'path';
import { getProducts, createProduct, updateProduct, deleteProduct, getBakerProducts } from '../controllers/Product.js';
import { auth } from '../middleware/auth.js';
import onlyAdmins from '../middleware/onlyAdmins.js';

const router = express.Router();

// Use the same uploads path as in index.js
const uploadDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // absolute path to uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get('/', getProducts);
router.get('/bakers/:bakerId', getBakerProducts);

router.post(
    '/',
    auth,
    onlyAdmins,
    upload.single('image'),
    (req, res, next) => {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Product image is required' });
        }
        next();
    },
    createProduct
);

router.put('/:id', auth, onlyAdmins, updateProduct);
router.delete('/:id', auth, onlyAdmins, deleteProduct);

export default router;
