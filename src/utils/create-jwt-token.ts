import { Secret, sign } from 'jsonwebtoken'
import { User } from '../entities/user.entity'

export const createJWTToken = (
  type: 'accessToken' | 'refreshToken',
  user: User
) => {
  return sign(
    {
      userId: user.id,
      ...(type === 'refreshToken' ? { tokenVersion: user.tokenVersion } : {}),
    },
    type === 'accessToken'
      ? (process.env.ACCESS_TOKEN_SECRET as Secret)
      : (process.env.REFRESH_TOKEN_SECRET as Secret),
    { expiresIn: type === 'accessToken' ? '15s' : '3d' }
  )
}
