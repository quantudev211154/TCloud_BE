import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AuthPayloadType } from '../types/auth-payload.type'

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token)
    return res.status(401).json({
      noti: 'Auth token not found',
    })

  try {
    const decoded = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as AuthPayloadType

    req.body.userId = decoded.userId

    return next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      noti: 'Auth token is not valid',
    })
  }
}
