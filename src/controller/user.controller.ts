import { Request, Response } from 'express'
import { User } from '../entities/user.entity'
import { ReturnUserType } from '../types/user.type'
import { converFullUserToReturnUser } from '../utils/convert-user-to-return-user'

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

  return res.status(200).json({
    user: converFullUserToReturnUser(exisingUser),
  })
}
