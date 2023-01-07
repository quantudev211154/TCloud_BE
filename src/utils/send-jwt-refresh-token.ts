import { Response } from 'express'
import { User } from '../entities/user.entity'
import { createJWTToken } from './create-jwt-token'

export const sendJWTRefreshToken = (res: Response, user: User) => {
  res.cookie(
    process.env.TCLOUD_REFRESH_TOKEN_NAME as string,
    createJWTToken('refreshToken', user),
    {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }
  )
  console.log('Cookie set')
}
