import { Router } from 'express'
import { create } from './create'
import { update } from './update'
import { deleteComment } from './delete-comment'

const router = Router()

router.post('/:post_id', create)
router.put('/:id', update)
router.delete('/:id', deleteComment)

export default router
