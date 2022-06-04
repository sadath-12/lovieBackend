import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderById,
    myOrdersList,
    ordersList,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/api/orders').get(protect, admin, ordersList)
router.route('/api/order/create').post(protect, addOrderItems)
router.route('/api/myorders').get(protect, myOrdersList)
router.route('/api/order/:id').get(protect, getOrderById)



export default router