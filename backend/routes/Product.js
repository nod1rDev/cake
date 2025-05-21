import express from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct, getBakerProducts } from '../controllers/Product.js'
import onlyAdmins from '../middleware/onlyAdmins.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/bakers/:bakerId', getBakerProducts);
router.post('/', auth, onlyAdmins, createProduct);
router.put('/:id', auth, onlyAdmins, updateProduct)
router.delete('/:id', auth, onlyAdmins, deleteProduct)

export default router