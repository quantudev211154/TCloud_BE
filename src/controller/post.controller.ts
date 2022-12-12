import { Request, Response } from 'express'
import { Post } from '../entities/post.entity'
import { User } from '../entities/user.entity'

export const getAllPosts = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId)
    return res.status(404).json({
      status: false,
      msg: 'User id is missing',
    })

  try {
    const posts = await Post.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          fullName: true,
          phone: true,
          createdAt: true,
        },
      },
    })

    return res.status(200).json({
      posts,
    })
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      status: false,
      msg: 'UserId can be invalid',
    })
  }
}

export const addPost = async (req: Request, res: Response) => {
  const { fileName, fileUrl, type, userId } = req.body

  if (!fileName || !fileUrl || !type || !userId)
    return res.status(400).json({
      status: false,
      msg: 'One of neccesary params is missing',
    })

  const existingUser = await User.findOneBy({ id: userId })

  if (!existingUser)
    res.status(404).json({
      status: false,
      msg: 'Not found any user has this id',
    })

  const newPost = await Post.create({
    fileUrl,
    fileName,
    user: existingUser as User,
    type,
  }).save()

  return res.status(200).json({
    newPost,
  })
}

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params

  if (!postId)
    return res.status(400).json({
      status: false,
      msg: 'One of neccesary params is missing',
    })

  try {
    const deletedPost = await Post.delete({
      id: postId,
    })

    res.status(200).json({
      deletedPost,
    })
  } catch (error) {
    return res.status(401).json({
      status: false,
      msg: 'UserId or postId can be invalid',
    })
  }
}
