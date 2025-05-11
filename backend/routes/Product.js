import express from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/Product.js'
import onlyAdmins from '../middleware/onlyAdmins.js'

const router = express.Router()

router.get('/', getProducts)
router.post('/', onlyAdmins, createProduct);
router.put('/:id', onlyAdmins, updateProduct)
router.delete('/:id', onlyAdmins, deleteProduct)

export default router