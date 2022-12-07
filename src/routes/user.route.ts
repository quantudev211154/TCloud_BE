import { Router } from 'express'
import { findUserByPhone } from '../controller/user.controller'
import { verifyToken } from '../middleware/auth'

const userRoute = Router()

userRoute.get('/:phone', verifyToken, findUserByPhone)

export default userRoute
