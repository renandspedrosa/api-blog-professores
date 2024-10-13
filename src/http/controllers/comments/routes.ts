import { Router } from 'express'
import { create } from './create'
import { getAll } from './get-all'
import { getById } from './get-by-Id'
import { update } from './update'
import { deleteComment } from './delete-comment'
import { validateCreateComment } from '@/http/middlewares/comments/validation-create-comment'
import { validationGetAllComments } from '@/http/middlewares/comments/validation-get-all-comments'
import { validationGetCommentById } from '@/http/middlewares/comments/validation-get-by-id'
import { isTeacher } from '@/http/middlewares/teacher/is-teacher'

const router = Router()

router.post('/:post_id', validateCreateComment, create)
router.post('/:post_id', create)
router.get('/', validationGetAllComments, getAll)
router.get('/:id', validationGetCommentById, getById)
router.get('/:id', getById)
router.put('/:id', validationGetCommentById, isTeacher, update)
router.delete('/:id', validationGetCommentById, isTeacher, deleteComment)

export default router
