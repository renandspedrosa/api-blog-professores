import { Router } from 'express'
import { create } from '@/http/controllers/post/create'
import { validateCreatePost } from '@/http/middlewares/post/validation-create-post'
import { findPostByTeacher } from '@/http/controllers/post/find-post-by-teacher'
import { deletePost } from '@/http/controllers/post/delete-post'

const router = Router()

router.post('/', validateCreatePost, create)
router.get('/teacher/:teacherId', findPostByTeacher)
router.delete('/post/:id', deletePost)

export default router
