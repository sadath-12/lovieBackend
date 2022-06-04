import express from 'express'
const router = express.Router()
import {
    authUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
    getUserById,
    getUsers,
    socialLogin
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

 
router.route('/api/login').post(authUser)
router.route('/api/login/sso').post(socialLogin)

router.route('/api/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/api/register').post(registerUser)

router.route('/api/users').get(protect, admin, getUsers)

router.route('/api/user/:id').get(protect, admin, getUserById)

export default router