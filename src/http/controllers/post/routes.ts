import { Router } from 'express'
import { create } from '@/http/controllers/post/create'
import { validateCreatePost } from '@/http/middlewares/post/validation-create-post'
import { validationFindPost } from '@/http/middlewares/post/validation-find-post'
import { findPostByTeacher } from '@/http/controllers/post/find-post-by-teacher'
import { deletePost } from '@/http/controllers/post/delete-post'
import { updatePost } from './update-post'
import { findPost } from './find-post'
import { findAllPost } from './find-all-post'
import { validationFindAllPost } from '@/http/middlewares/post/validation-find-all-post'

const router = Router()

router.post('/', validateCreatePost, create)
router.get('/teacher/:teacherId', findPostByTeacher)
router.get('/', validationFindAllPost, findAllPost)
router.put('/:id', validationFindPost, updatePost)
router.get('/:id', validationFindPost, findPost)
router.delete('/:id', validationFindPost, deletePost)

export default router
