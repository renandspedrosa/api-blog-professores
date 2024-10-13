import { Router } from 'express'
import { create } from './create'
import { getById } from './get-by-Id'
import { update } from './update'
import { deleteComment } from './delete-comment'
import { validateCreateComment } from '@/http/middlewares/comments/validation-create-comment'
import { validateResponsibleComment } from '@/http/middlewares/comments/validation-responsible-comment'
import { validateDeleteComment } from '@/http/middlewares/comments/validation-delete-comment'

const router = Router()

router.post('/:post_id', validateCreateComment, create)
router.get('/:id', getById)
router.put('/:id', validateResponsibleComment, update)
router.delete('/:id', validateDeleteComment, deleteComment)

export default router
