import { Router } from 'express'
import { create } from './create'
import { validateCreatePost } from '@/http/middlewares/post/validation-create-post'
import { findPost } from './find-post'

const router = Router()

router.post('/', validateCreatePost, create)
router.get('/teacher/:teacherId', findPost)

export default router
