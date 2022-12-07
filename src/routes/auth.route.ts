import { Request, Response, Router } from 'express'
import { login, logout, register } from '../controller/auth.controller'
import { verifyToken } from '../middleware/auth'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.get('/logout/:phone', verifyToken, logout)

export default authRouter
