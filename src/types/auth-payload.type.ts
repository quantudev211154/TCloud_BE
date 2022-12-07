import { JwtPayload } from 'jsonwebtoken'

export type AuthPayloadType = JwtPayload & {
  userId: string
  phone: string
  tokenVersion: number
}
