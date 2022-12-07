import { Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import { User } from '../entities/user.entity'
import { AuthPayloadType } from '../types/auth-payload.type'
import { createJWTToken } from '../utils/create-jwt-token'
import { sendJWTRefreshToken } from '../utils/send-jwt-refresh-token'

export const createAndSendRefreshToken = async (
  req: Request,
  res: Response
) => {
  const refreshToken =
    req.cookies[process.env.TCLOUD_REFRESH_TOKEN_NAME as string]

  if (!refreshToken)
    return res.status(401).json({
      status: false,
      msg: 'Refresh token not found',
    })

  try {
    const decoded = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    ) as AuthPayloadType

    const existingUser = await User.findOneBy({ id: decoded.userId })

    if (!existingUser || existingUser.tokenVersion !== decoded.tokenVersion)
      return res.status(401).json({
        status: false,
        msg: 'Refresh token is not valid',
      })

    sendJWTRefreshToken(res, existingUser)

    return res.status(200).json({
      accessToken: createJWTToken('accessToken', existingUser),
    })
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      status: false,
      msg: 'Refresh token is not valid',
    })
  }
}
