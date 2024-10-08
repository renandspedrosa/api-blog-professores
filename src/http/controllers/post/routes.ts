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
import { isTeacher } from '@/http/middlewares/teacher/is-teacher'
import { findPostByTerm } from './find-post-by-term'
import { validationFindByTerm } from '@/http/middlewares/post/validation-find-by-term'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validateCreatePostViewed } from '@/http/middlewares/post/validation-create-post-viewed'
import { createPostViewed } from './create-post-viewed'
import { findCommentsByPostId } from '@/http/controllers/post/find-comments-by-post-id'

const router = Router()

router.post('/', isTeacher, validateCreatePost, create)
router.get('/teacher/:teacherId', validationFindAll, findPostByTeacher)
router.get('/', validationFindAllPost, findAllPost)
router.get('/search', validationFindByTerm, findPostByTerm)
router.put('/:id', isTeacher, validationFindPost, updatePost)
router.get('/:id', validationFindPost, findPost)
router.get('/:id/comments', findCommentsByPostId)
router.delete('/:id', isTeacher, validationFindPost, deletePost)
router.post('/:post_id/viewed', validateCreatePostViewed, createPostViewed) // TODO: criar midleware para permitir somente students

export default router
