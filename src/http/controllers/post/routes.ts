import { Router } from 'express'
import { create } from './create'
import { validateCreatePost } from '@/http/middlewares/post/validation-create-post'
import { findPostByTeacher } from './find-post-by-teacher'

const router = Router()

router.post('/', validateCreatePost, create)
router.get('/teacher/:teacherId', findPostByTeacher)

export default router
