import { Router } from 'express'
import { createAndSendRefreshToken } from '../controller/refresh-token.controller'

const refreshTokenRoute = Router()

refreshTokenRoute.get('/refresh_token', createAndSendRefreshToken)
