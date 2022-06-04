import express from 'express'
const router = express.Router()
import {
    getProducts,
    createProduct,
    createProductReview,
    getTopRatedProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/api/products').get(getProducts)
router.route('/api/products/top').get(getTopRatedProducts)

router.route('/api/product/create').post(protect, admin, createProduct)

router.route('/api/product/:id/reviews').post(protect, createProductReview)


export default router