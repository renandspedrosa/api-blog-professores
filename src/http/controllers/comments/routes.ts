import { Router } from 'express'
import { create } from './create'
import { getAll } from './getAll'
import { update } from './update'
import { deleteComment } from './delete-comment'
import { validationFindAllPost } from '@/http/middlewares/post/validation-find-all-post'

const router = Router()

router.post('/:post_id', create)
router.post('/', validationFindAllPost, getAll)
router.put('/:id', update)
router.delete('/:id', deleteComment)

export default router
