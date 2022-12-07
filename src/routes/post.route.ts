import { Router } from 'express'
import { addPost, deletePost, getAllPosts } from '../controller/post.controller'
import { verifyToken } from '../middleware/auth'

const postRoute = Router()

postRoute.get('/:userId', verifyToken, getAllPosts)
postRoute.post('/', verifyToken, addPost)
postRoute.delete('/:postId', verifyToken, deletePost)

export default postRoute
