import { User } from '../entities/user.entity'
import { ReturnUserType } from '../types/user.type'

export const converFullUserToReturnUser = (user: User): ReturnUserType => {
  return {
    id: user.id as string,
    fullName: user.fullName,
    avatar: user.avatar as string,
    phone: user.phone,
    createdAt: user.createdAt as string,
  }
}
