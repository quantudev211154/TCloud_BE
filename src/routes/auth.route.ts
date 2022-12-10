import { Request, Response, Router } from 'express'
import {
  checkExistingPhone,
  login,
  logout,
  register,
} from '../controller/auth.controller'
import { verifyToken } from '../middleware/auth'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.get('/check-existing-phone/:phone', checkExistingPhone)
authRouter.get('/logout/:id', verifyToken, logout)

export default authRouter
