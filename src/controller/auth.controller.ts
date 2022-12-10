import { Request, Response } from 'express'
import { User } from '../entities/user.entity'
import { hash, verify } from 'argon2'
import { ReturnUserType } from '../types/user.type'
import { createJWTToken } from '../utils/create-jwt-token'
import { sendJWTRefreshToken } from '../utils/send-jwt-refresh-token'
import { converFullUserToReturnUser } from '../utils/convert-user-to-return-user'

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body

  if (!phone || !password)
    return res.status(400).json({
      status: false,
      msg: 'Phone or password is missing',
    })

  const existingUser = await User.findOneBy({
    phone,
  })

  if (!existingUser)
    return res.status(404).json({
      status: false,
      msg: 'Phone or password is incorrect',
    })

  const verifyPassword = await verify(existingUser.password, password)

  if (!verifyPassword)
    return res.status(400).json({
      status: false,
      msg: 'Phone or password is incorrect',
    })

  sendJWTRefreshToken(res, existingUser)

  return res.status(200).json({
    user: converFullUserToReturnUser(existingUser),
    accessToken: createJWTToken('accessToken', existingUser),
  })
}

export const register = async (req: Request, res: Response) => {
  const { fullName, phone, password } = req.body

  if (!fullName || !phone || !password)
    return res.status(400).json({
      status: false,
      msg: 'Fullname or phone or password is missing',
    })

  const existingUser = await User.findOneBy({
    phone,
  })

  if (existingUser)
    return res.status(400).json({
      status: false,
      msg: 'This phone has been used',
    })

  const hashedPassword = await hash(password)

  const newUser = await User.create({
    fullName,
    phone,
    password: hashedPassword,
  }).save()

  return res.status(200).json({
    user: converFullUserToReturnUser(newUser),
  })
}

export const logout = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id)
    return res.status(400).json({
      status: false,
      msg: 'Phone is missing',
    })

  const exisingUser = await User.findOneBy({
    id,
  })

  if (!exisingUser)
    return res.status(400).json({
      status: false,
      msg: 'User Id is incorrect',
    })

  exisingUser.tokenVersion = (exisingUser.tokenVersion as number) + 1

  exisingUser.save()

  return res.status(200).json({
    status: true,
    msg: 'Logged out',
  })
}

export const checkExistingPhone = async (req: Request, res: Response) => {
  const { phone } = req.params

  if (!phone)
    return res.status(400).json({
      status: false,
      msg: 'Phone is missing',
    })

  const existingUser = await User.findOneBy({
    phone,
  })

  if (existingUser)
    return res.status(400).json({
      status: false,
      msg: 'Phone is used by other user',
    })

  return res.status(200).json({
    msg: 'Phone is free to register',
  })
}
