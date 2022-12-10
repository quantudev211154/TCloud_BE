import { Router } from 'express'
import { createAndSendRefreshToken } from '../controller/refresh-token.controller'

const refreshTokenRoute = Router()

refreshTokenRoute.get('/tcloud_refresh_token', createAndSendRefreshToken)

export default refreshTokenRoute
