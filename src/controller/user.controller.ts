import { Request, Response } from 'express'
import { User } from '../entities/user.entity'
import { ReturnUserType } from '../types/user.type'

export const findUserByPhone = async (req: Request, res: Response) => {
  const { phone } = req.params

  if (!phone)
    return res.status(400).json({
      status: false,
      msg: 'Phone is missing',
    })

  const exisingUser = await User.findOneBy({
    phone,
  })

  if (!exisingUser)
    return res.status(404).json({
      status: false,
      msg: 'Not found any user has phone like this',
    })

  const returnPayload: ReturnUserType = {
    id: exisingUser.id as string,
    avatar: exisingUser.avatar as string,
    fullName: exisingUser.fullName,
    createdAt: exisingUser.createdAt as string,
    phone: exisingUser.phone,
  }

  return res.status(200).json({
    user: returnPayload,
  })
}
